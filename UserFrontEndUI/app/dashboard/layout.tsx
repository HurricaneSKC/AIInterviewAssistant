import "../../styles/globals.css";
import { Metadata } from "next";
import { NavLink, Sidebar } from "@/components/Navigation/Sidebar";
import {
  MobileLink,
  MobileLinkText,
  MobileNav,
} from "@/components/Navigation/MobileNav";
import { CustomUser, auth } from "@/auth";
import { redirect } from "next/navigation";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import FolderIcon from "@mui/icons-material/Folder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
  if (!session) {
    redirect("/user/login");
  }
  const user = session?.user as CustomUser;

  const name = user.name || "User";

  console.log(session);

  return (
    <section className="bg-green flex overflow-hidden h-[100lvh] md:flex-row flex-col scroll-smooth antialiased [font-feature-settings:'ss01']">
      <Sidebar userName={name}>
        <NavLink path="/dashboard" name="Dashboard" />
        <NavLink path="/dashboard/my-interviews" name="My Interviews" />
        <NavLink path="/dashboard/questions" name="Questions" />
        <NavLink path="/dashboard/resources" name="Resources" />
      </Sidebar>
      <div className="w-full overflow-y-auto flex-grow md:p-12 p-4 pb-0 md:pb-12 flex justify-center">
        <div className="w-full flex-grow max-w-[1400px]">{children}</div>
      </div>
      <MobileNav>
        <MobileLink path="/dashboard">
          <SpaceDashboardIcon />
          <MobileLinkText text="Dashboard" />
        </MobileLink>
        <MobileLink path="/dashboard/my-interviews">
          <BusinessCenterIcon />
          <MobileLinkText text="My Interviews" />
        </MobileLink>
        <MobileLink path="/dashboard/questions">
          <QuestionMarkIcon />
          <MobileLinkText text="Questions" />
        </MobileLink>
        <MobileLink path="/dashboard/resources">
          <FolderIcon />
          <MobileLinkText text="Resources" />
        </MobileLink>
        <MobileLink path="/dashboard/account">
          <AccountCircleIcon />
          <MobileLinkText text="Account" />
        </MobileLink>
      </MobileNav>
    </section>
  );
}
