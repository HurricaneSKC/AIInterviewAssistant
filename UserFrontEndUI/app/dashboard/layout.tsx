import "../../styles/globals.css";
import { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { MobileNav } from "@/components/MobileNav/MobileNav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
  const session = await auth();

  console.log(session);

  if (!session) {
    redirect("/user/login");
  }
  return (
    <section className="bg-green flex overflow-hidden h-[100lvh] md:flex-row flex-col scroll-smooth antialiased [font-feature-settings:'ss01']">
      <Sidebar />
      <div className="w-full overflow-y-auto flex-grow md:p-12 p-4">
        <div className="w-full overflow-y-auto flex-grow">{children}</div>
      </div>
      <MobileNav />
    </section>
  );
}
