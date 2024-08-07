import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../app/lib/authUtils";
import { getUserByEmail, saveNewUser } from "../../../app/lib/db.operations";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const validatedData = schema.parse(req.body);
    const { email, password } = validatedData;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const insertedId = await saveNewUser({ email, password: hashedPassword });
    console.log(`User created with ID: `, insertedId);
    res.status(201).json({ message: "User created", userId: insertedId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(422)
        .json({ message: "Invalid input", errors: error.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
