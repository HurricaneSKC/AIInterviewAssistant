import { IGuestToken, IUser, IVerifyCode } from "./db.types";
import {
  connectToDatabase,
  usersCollection,
  guestTokensCollection,
} from "./db.connection";
import { ObjectId, WithId } from "mongodb";

export async function getUserByEmail(email: string) {
  try {
    if (!usersCollection) await connectToDatabase();
    const user = await usersCollection.findOne({ email });
    return user;
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return null;
  }
}

export async function getUserById(
  userId: IUser["_id"]
): Promise<WithId<IUser>> {
  try {
    if (!usersCollection) await connectToDatabase();
    const user = await usersCollection.findOne({ _id: userId });
    if (!user) {
      throw new Error(`Failed to get user with id: ${userId}`);
    }
    return user;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error(`Failed to get user with id: ${userId}`);
  }
}

export async function getUserByAuthCode(
  code: IVerifyCode
): Promise<WithId<IUser> | null> {
  try {
    if (!usersCollection) await connectToDatabase();
    const user = await usersCollection.findOne(code);
    return user;
  } catch (error) {
    console.error(`Unable to get user with Auth Code: `, code);
    throw new Error(`Failed to get user with Auth Code: ${code}`);
  }
}

export async function saveNewUser({ email, password }: IUser) {
  try {
    if (!usersCollection) await connectToDatabase();
    const result = await usersCollection.insertOne({
      email: email,
      password,
    });
    return result.insertedId;
  } catch (error) {
    console.error("Failed to save user: ", error);
    return null;
  }
}

export async function updateUserWith(user: WithId<IUser>, obj: object) {
  const updateResult = await usersCollection.updateOne(
    { _id: user._id },
    { $set: obj }
  );
  if (
    updateResult?.upsertedId === user._id &&
    updateResult?.modifiedCount === 1
  ) {
    return obj;
  }
  return null;
}

export async function verifyUserCode(
  verifyCodeDto: IVerifyCode
): Promise<{ isVerified: boolean; id: ObjectId | undefined }> {
  try {
    let isVerified = false;
    if (!usersCollection) await connectToDatabase();
    const user = await usersCollection.findOne(verifyCodeDto);
    if (user) {
      const result = await usersCollection.updateOne(
        { _id: user._id },
        {
          $set: { isVerified: true },
          $unset: { verificationCode: "", verificationCodeExpiry: "" },
        }
      );
      isVerified = result.upsertedId === user._id;
    }
    return { isVerified, id: user?._id };
  } catch (error) {
    console.error("Unable to verify Code, ", error);
    return { isVerified: false, id: undefined };
  }
}

export async function verifyGuestToken(
  token: string
): Promise<boolean> {
  try {
    if (!guestTokensCollection) await connectToDatabase();
    const currentDate = new Date();
    const guestToken = await guestTokensCollection.findOne({
      token: token,
      expiry: { $gt: currentDate },
    });
    return !!guestToken;
  } catch (error) {
    console.error("Failed to verify guest token:", error);
    return false;
  }
}

export async function saveNewGuestToken(token: IGuestToken) {
  try {
    if (!guestTokensCollection) await connectToDatabase();
    const result = await guestTokensCollection.insertOne(token);
    return result;
  } catch (error) {
    console.error("Failed to save token into DB: ", error);
  }
}
