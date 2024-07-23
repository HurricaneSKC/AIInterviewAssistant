import { NextApiRequest, NextApiResponse } from "next";
import { IGuestToken } from "../../../app/lib/db.types";
import { saveNewGuestToken } from "../../../app/lib/db.operations";
import { generateToken } from "../../../app/lib/authUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const guestToken = generateToken();
    const guestTokenExpiry = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours from now

    console.log("Guest Token generated: ", { guestToken });

    const tokenDto: IGuestToken = {
      token: guestToken,
      expiry: guestTokenExpiry,
    };

    const result = await saveNewGuestToken(tokenDto);

    if (result?.insertedId) {
      res.status(200).json({ guestToken });
    } else {
      res.status(500).json({ message: "Failed to insert guest token" });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error inserting new token: ", error);
    } else {
      console.error({ error });
    }
  }
}
