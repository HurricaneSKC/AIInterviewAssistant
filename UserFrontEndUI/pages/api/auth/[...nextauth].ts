import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

import {
  verifyGuestToken,
  getUserByEmail,
} from "../../../app/lib/db.operations";
import { verifyPassword } from "../../../app/lib/authUtils";

const client = new DynamoDBClient({ region: "your-region" });
const ddbDocClient = DynamoDBDocumentClient.from(client);


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "guest-authorizer",
      name: "Guest",
      credentials: {
        guestToken: { label: "Guest Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Invalid credentials or guest token");
        }
        const { guestToken } = credentials;
        const isValid = await verifyGuestToken(guestToken);
        if (!isValid) {
          throw new Error("Invalid guest token");
        }
        return { id: "guest", email: "guest@example.com" };
      },
    }),
    CredentialsProvider({
      id: "credentials-authorizer",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        const user = await getUserByEmail(email);
        if (!user) {
          throw new Error("No user found");
        }
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        return { ...session, user: { ...session.user, id: token.id } };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
