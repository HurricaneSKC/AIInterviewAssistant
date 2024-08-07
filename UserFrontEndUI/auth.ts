import NextAuth from "next-auth"
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import CredentialsProvider from "next-auth/providers/credentials";
 
const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID ?? "",
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET ?? "",
  },
  region: process.env.AUTH_DYNAMODB_REGION,
}
 
const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const { email, password } = credentials;

      // Query DynamoDB for the user
      const params = {
        TableName: 'users',
        Key: { id: email },
      };

      try {
        console.log("HELLO")
        console.log(email)
        const result = await client.get(params);
        const user = result.Item;
        console.log(user)

        if (user) {
          // Password matches
          console.log("MATCH")
          return user;
        } else {
          // Invalid credentials
          return null;
        }
      } catch (error) {
        console.error("Error fetching user from DynamoDB:", error);
        return null;
      }
    },
  }),],
  pages: {
    signIn: "/login"
  }
})