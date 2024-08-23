import Link from "next/link";
import { UserProfileIcon } from "../User/UserProfileIcon";
interface Props {
  userName: string;
}

export const UserProfileButton = ({ userName }: Props) => {
  return (
    <div className="flex">
      <Link
        href="/dashboard/account"
        className="flex items-center w-full justify-between"
      >
        <p className="mr-4 hidden md:block h-fit text-sm">{userName}</p>
        <UserProfileIcon fullName={userName} />
      </Link>
    </div>
  );
};
