import { NextApiRequest, NextApiResponse } from "next";
import { verifyUserCode } from "../../../app/lib/db.operations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, code } = req.body;

  const isVerified = await verifyUserCode({
    _id: userId,
    verificationCode: code,
    verificationCodeExpiry: { $gt: Date.now() },
  });

  if (!isVerified) {
    return res
      .status(400)
      .json({ message: "Invalid or expired verification code" });
  }
  res.status(200).json({ message: "Verification successful" });
}
