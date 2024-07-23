import NextAuth, { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../app/lib/db.connection";
import {
  verifyGuestToken,
  getUserByEmail,
} from "../../../app/lib/db.operations";
import { verifyPassword } from "../../../app/lib/authUtils";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    CredentialsProvider({
      id: "guest-authorizer",
      name: "Guest",
      credentials: {
        guestToken: { label: "Guest Token", type: "text" },
      },
      async authorize(credentials) {
        console.log({ credentials });
        if (!credentials) {
          throw new Error("Invalid credentials or guest token");
        }
        const { guestToken } = credentials;
        console.log({ guestToken });
        const isValid = await verifyGuestToken(guestToken);
        console.log({ isValid });
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
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<any> {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        const user = await getUserByEmail(email);
        console.log({ user });
        if (!user) {
          throw new Error("No user found");
        }
        const isValid = await verifyPassword(password, user.password);
        console.log({ isValid });
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        return { id: user._id, email: user.email };
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
