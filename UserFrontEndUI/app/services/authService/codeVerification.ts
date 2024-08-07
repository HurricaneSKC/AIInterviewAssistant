import type { UpdateResult, WithId } from "mongodb";
import type { IUser } from "../../lib/db.types";
import { generateVerificationCode } from "../../lib/authUtils";
import { getUserById, updateUserWith } from "../../lib/db.operations";
import { sendSmsVerificationCode } from "../../lib/sms";

async function saveUserVerificationCode(user: WithId<IUser>) {
  try {
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = Date.now() + 600000; // 10 minutes from now
    const updateResult = (await updateUserWith(user, {
      verificationCode,
      verificationCodeExpiry,
    })) as UpdateResult<IUser>;
    if (
      updateResult?.upsertedId === user._id &&
      updateResult?.modifiedCount === 1
    ) {
      return verificationCode;
    }
    return null;
  } catch (error) {
    console.error(
      "Unable to save verification code for user with id: ",
      user._id
    );
    return null;
  }
}

export async function sendVerificationCode(userId: IUser["_id"]) {
  try {
    7;
    const user = await getUserById(userId);
    if (!user) {
      throw new Error(`Unable to retrieve user by id: ${userId}`);
    }
    const verificationCode = await saveUserVerificationCode(user);
    if (verificationCode) {
      await sendSmsVerificationCode(user.phoneNumber, verificationCode);
    } else {
      throw new Error(
        `Failed to get verification code for user id: ${user._id}`
      );
    }
    return true;
  } catch (error) {
    console.error("Unable to send Code, ", error);
    return false;
  }
}
