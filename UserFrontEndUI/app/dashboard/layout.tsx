import "../../styles/globals.css";
import { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "AIIA - Home",
  openGraph: {
    title: "AIIA - Home",
    description:
      "AIIA is an AI-powered mock interview platform that helps you practice for your next job interview.",
  },
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex scroll-smooth antialiased [font-feature-settings:'ss01']">
        <Sidebar />
        <div className="w-full p-12 pt-16">{children}</div>
      </body>
    </html>
  );
}
