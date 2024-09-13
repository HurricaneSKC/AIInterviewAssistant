import NextAuth from "next-auth"
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument, GetCommand, GetCommandInput } from "@aws-sdk/lib-dynamodb"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";
import { AdapterUser } from "next-auth/adapters";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID ?? "",
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET ?? "",
  },
  region: process.env.AUTH_DYNAMODB_REGION,
}

const dynamoDBClient = new DynamoDB(config);
 
const client = DynamoDBDocument.from(dynamoDBClient, {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})

export interface CustomUser extends AdapterUser {
  role: string;
  created_at: string;
  password_hash: string;
  isActive?: boolean;
}

const adapter = DynamoDBAdapter(client, {
  tableName: "users",
  partitionKey: "email",
  sortKey: "id",
  indexName: "email-id-index",
  indexPartitionKey: "email",
  indexSortKey: "id",
});

if (!adapter || !adapter.getUserByEmail) {
  throw new Error("DynamoDBAdapter is not properly configured.");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      if (!credentials || typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
        console.log("Invalid credentials format.");
        return null;
      }
    
      const { email, password } = credentials;
    
      try {
        console.log(`Looking up user with email: ${email}`);
    
        // Direct DynamoDB query
        const params: GetCommandInput = {
          TableName: "users", // Ensure this matches DynamoDB table name
          Key: { 
            email: email,
            id: email // 'id' is the same as email for now change this as needed
          }
        };
    
        const result = await client.send(new GetCommand(params));
        const user = result.Item as CustomUser | null;
    
        if (!user) {
          console.log(`No user found with email: ${email}`);
          return null;
        }

        if (user && !user.isActive) {
          throw new Error("User account is inactive");
        }
    
        console.log("User found:", user);
    
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        if (isPasswordMatch) {
          console.log("Password match");
          return user;
        } else {
          console.log("Password does not match");
          return null;
        }
      } catch (error) {
        console.error("Error in authorize function:", error);
        return null;
      }
    }
  }),],
  pages: {
    signIn: "/user/signin",
  },
  adapter,
  callbacks: {
    async session({ session, token }) {
      // Fetch the latest user data from DynamoDB
      const params = {
        TableName: "users",
        Key: { email: token.email, id: token.email },
      };
  
      try {
        const result = await client.send(new GetCommand(params));
        const user = result.Item as CustomUser | null;
  
        if (user) {
          session.user = user; // Update the session with the latest user data
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
  
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
  
        token.id = customUser.id;
        token.name = customUser.name;
        token.email = customUser.email;
        token.role = customUser.role;
        token.created_at = customUser.created_at;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt", 
  },
})
