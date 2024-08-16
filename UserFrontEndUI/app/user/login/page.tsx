import { signIn, auth } from "@/auth";
import AnimateDiv from "@/components/Animation/AnimateDiv";
import Button from "@/components/CTAs/Button";
import PTag from "@/components/Typography/PTag";
import Link from "next/link";
import { H1, H2 } from "@/components/Typography/Header";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth();

  console.log("dashboard", session);

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
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            className="p-2 rounded-xl"
          />
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="p-2 rounded-xl"
          />
          <Button type="submit" buttonText="Sign in" primary />
        </form>
        <PTag className="my-1 mt-2 block md:hidden" small>
          <Link className="underline" href={"/user/forgot-password"}>
            I forgot my password
          </Link>
        </PTag>
        <PTag className="my-1 block md:hidden" small>
          New here? Click to{" "}
          <Link className="underline" href={"/user/signup"}>
            create an account!
          </Link>
        </PTag>
      </div>
    </AnimateDiv>
  );
};

export default SignIn;
