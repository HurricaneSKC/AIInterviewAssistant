import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Metadata } from "next";
import { auth } from "@/auth";
import { url } from "inspector";

export const metadata: Metadata = {
  title: "AIIA - AI-Powered Mock Interviews",
  description:
    "AIIA is an AI-powered mock interview platform that helps you practice for your next job interview.",
  openGraph: {
    title: "AIIA - AI-Powered Mock Interviews",
    description:
      "AIIA is an AI-powered mock interview platform that helps you practice for your next job interview.",
    type: "website",
    url: "https://ai-interview-assistant.vercel.app",
    images: [
      {
        url: "../public/aiia.png",
        width: 800, // Optional: specify image width
        height: 600, // Optional: specify image height
        alt: "AIIA Logo",
      },
    ],
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
