import { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail, updateUserWith } from "../../../app/lib/db.operations";
import { sendResetPasswordEmail } from "../../../app/lib/email";
import { generateResetToken } from "../../../app/lib/authUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = generateResetToken();
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

  await updateUserWith(user, { resetToken, resetTokenExpiry });

  await sendResetPasswordEmail(email, resetToken);

  res.status(200).json({ message: "Reset password email sent" });
}
