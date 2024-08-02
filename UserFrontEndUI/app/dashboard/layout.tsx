import "../../styles/globals.css";
import { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { MobileNav } from "@/components/MobileNav/MobileNav";
import AnimateDiv from "@/components/AnimateDiv";

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
      <div className="w-full md:p-12 md:pt-16 p-4 overflow-y-auto flex-grow">
        <AnimateDiv>{children}</AnimateDiv>
      </div>
      <MobileNav />
    </section>
  );
}
