import "../../styles/globals.css";
import { Metadata } from "next";
import { Sidebar } from "@/components/Navigation/Sidebar";
import { MobileNav } from "@/components/Navigation/MobileNav";
import Link from "next/link";

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
    <section className="bg-green flex overflow-hidden h-[100lvh] md:flex-row flex-col scroll-smooth antialiased [font-feature-settings:'ss01']">
      <nav className="md:flex bg-gray-100 w-[300px] p-10 hidden flex-col text-[20px] gap-y-6">
        <Link href="/">
          <div className="w-full h-[100px] mb-6 flex items-center">
            <p className="text-6xl text-primary">
              <em className="not-italic text-black">AI</em>IA
            </p>
          </div>
        </Link>
        <Link href="/user/signup">Sign Up</Link>
        <Link href="/user/login">Log in</Link>
        <Link href="/user/forgot-password">Forgot Password</Link>
      </nav>
      <div className="w-full md:p-12 md:pt-16 p-4 overflow-y-auto flex-grow">
        {children}
      </div>
      <MobileNav />
    </section>
  );
}
