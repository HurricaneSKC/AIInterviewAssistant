import "../../styles/globals.css";
import { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { MobileNav } from "@/components/MobileNav/MobileNav";
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
      <Sidebar />
      <div className="w-full overflow-y-auto flex-grow md:p-12 p-4">
        <div className="flex justify-end">
          <Link href="/dashboard/account" className="flex">
            <p className="mr-4">David Frame</p>
            <div className="rounded-full border-2 w-8 h-8 border-primary"></div>
          </Link>
        </div>
        <div className="w-full overflow-y-auto flex-grow">{children}</div>
      </div>
      <MobileNav />
    </section>
  );
}
