import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "AIIA - AI-Powered Mock Interviews",
  openGraph: {
    title: "AIIA - AI-Powered Mock Interviews",
    description:
      "AIIA is an AI-powered mock interview platform that helps you practice for your next job interview.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="scroll-smooth antialiased [font-feature-settings:'ss01'] text-site">
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
