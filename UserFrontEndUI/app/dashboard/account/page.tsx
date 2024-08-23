// app/account/page.tsx
import { CustomUser, auth } from "@/auth";
import Button from "@/components/CTAs/Button";
import DeleteUserButton from "@/components/CTAs/DeleteUserButton";
import SignOutButton from "@/components/CTAs/SignOutButton";
import { H1, H2 } from "@/components/Typography/Header";
import { UserProfileIcon } from "@/components/User/UserProfileIcon";
import Delete from "@mui/icons-material/Delete";

const Account = async () => {
  const session = await auth();
  if (!session) return null;
  const user = session?.user as CustomUser;

  return (
    <>
      <H1>Account Settings</H1>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
          <UserProfileIcon fullName={user.name} sizeMultiplier={3} />
          <p className="text-xl font-semibold mt-4">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div>
          <H2 small>Account Management</H2>
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 mb-4">
            <SignOutButton />
            <DeleteUserButton email={user.email} softDelete />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
