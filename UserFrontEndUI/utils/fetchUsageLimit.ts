import { cookies } from "next/headers";

export async function checkUsageLimit() {
  const cookieStore = cookies();
  const PATH = "/api/user/usage-limit";

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
    // try {
    //   const response = await fetch('/api/user/usage-limit');
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const data = await response.json();
      
    //   console.log('Usage Count:', data.usageCount);
    //   console.log('Usage Limit:', data.useageLimit);
    //   console.log('Is Limit Reached:', data.isLimitReached);
      
    //   return data.isLimitReached;
    // } catch (error) {
    //   console.error('Error checking usage limit:', error);
    //   return false;
    // }