import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth();

  console.log(session);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        action={async (formdata) => {
          "use server";
          try {
            await signIn("credentials", formdata, { redirectTo: "/dashboard" });
          } catch (error) {
            throw error;
          }
        }}
      >
        <label>
          Email
          <input name="email" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">
          <span>Sign in</span>
        </button>
      </form>
    </div>
  );
};

export default SignIn;
