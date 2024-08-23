import "../../styles/globals.css";
import { Metadata } from "next";
import { NavLink, Sidebar } from "@/components/Navigation/Sidebar";
import {
  MobileLink,
  MobileLinkText,
  MobileNav,
} from "@/components/Navigation/MobileNav";

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
      <Sidebar>
        <NavLink path="/user/signup" name="Sign up" />
        <NavLink path="/user/signin" name="Sign in" />
        <NavLink path="/user/forgot-password" name="Forgot Password" />
      </Sidebar>
      <div className="w-full md:p-12 md:pt-16 p-4 overflow-y-auto flex-grow">
        {children}
      </div>
    </section>
  );
}
