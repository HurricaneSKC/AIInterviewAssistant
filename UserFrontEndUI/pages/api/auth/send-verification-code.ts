import { sendVerificationCode } from "@/app/services/authService/codeVerification";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const isCodeSent = await sendVerificationCode(userId);

    if (isCodeSent) {
      return res.status(200).json({ message: "Verification code sent" });
    } else {
      // If the verification code couldn't be sent due to an unprocessable entity
      return res
        .status(422)
        .json({ message: "Unable to send verification code" });
    }
  } catch (error) {
    // If there's a service issue or an unexpected error
    console.error("Error sending verification code:", error);
    return res
      .status(503)
      .json({ message: "Service unavailable, please try again later" });
  }
}
