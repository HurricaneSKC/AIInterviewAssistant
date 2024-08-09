import { signIn, auth } from "@/auth";
import AnimateDiv from "@/components/AnimateDiv";
import Button from "@/components/CTAs/Button";
import H1 from "@/components/HTMLTags/H1";
import H2 from "@/components/HTMLTags/H2";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth();

  console.log(session);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <AnimateDiv>
      <H1>Login</H1>
      <H2>Welcome back</H2>
      <div className="bg-gray-100 rounded-xl w-full flex flex-col p-8">
        <form
          action={async (formdata) => {
            "use server";
            console.log(formdata);
            debugger;

            try {
              await signIn("credentials", formdata, {
                redirectTo: "/dashboard",
              });
            } catch (error) {
              throw error;
            }
          }}
          className="w-full flex flex-col gap-6"
        >
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <Button type="submit" buttonText="Sign in" primary />
        </form>
      </div>
    </AnimateDiv>
  );
};

export default SignIn;
