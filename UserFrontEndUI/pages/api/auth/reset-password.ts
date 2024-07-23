import { NextApiRequest, NextApiResponse } from "next";
import { resetPasswordService } from "../../../app/services/authService/resetPassword";
import { hashPassword } from "../../../app/lib/authUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { token, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const success = await resetPasswordService(token, hashedPassword);

    if (!success) {
      return res
        .status(503)
        .json({
          message: "The password reset service is currently unavailable.",
        });
    }
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(`Error handling password reset: ${error}`);
    res
      .status(500)
      .json(`Unexpected Error on reset password handler: ${error}`);
  }
}
