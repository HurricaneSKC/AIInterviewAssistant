import { cookies } from "next/headers";

export async function checkUsageLimit() {
  const cookieStore = cookies();
  const PATH = "/api/user/v1/usage-limit";

  const URL =
    process.env.VERCEL_ENV === "development"
      ? `http://${process.env.VERCEL_URL}${PATH}`
      : process.env.VERCEL_ENV === "production"
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}${PATH}`
      : `https://${process.env.VERCEL_URL}${PATH}`;

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.log("response", response);

      if (response.status === 401) {
        console.error("Unauthorized: User not authenticated");
        return false;
      }
      throw new Error(
        `Failed to fetch questions answered: ${response.statusText}`
      );
    }

      const data = await response.json();
      console.log("API Response:", data);

      return data.isLimitReached;

    }
