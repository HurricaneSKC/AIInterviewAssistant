import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
import { IGuestToken, IUser, IVerifyCode } from "./db.types";

dotenv.config();

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function getUserByEmail(email: string) {
  try {
    const params = {
      TableName: "users",
      Key: { email },
    };
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    return Item;
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return null;
  }
}

export async function getUserById(userId: string): Promise<IUser | null> {
  try {
    const params = {
      TableName: "users",
      Key: { _id: userId },
    };
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    if (!Item) {
      throw new Error(`Failed to get user with id: ${userId}`);
    }
    return Item;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error(`Failed to get user with id: ${userId}`);
  }
}

export async function getUserByAuthCode(code: IVerifyCode): Promise<IUser | null> {
  try {
    const params = {
      TableName: "users",
      Key: code,
    };
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    return Item;
  } catch (error) {
    console.error(`Unable to get user with Auth Code: `, code);
    throw new Error(`Failed to get user with Auth Code: ${code}`);
  }
}

export async function saveNewUser({ email, password }: IUser) {
  try {
    const params = {
      TableName: "users",
      Item: {
        email: email,
        password: password,
      },
    };
    const result = await ddbDocClient.send(new PutCommand(params));
    return result;
  } catch (error) {
    console.error("Failed to save user: ", error);
    return null;
  }
}

export async function updateUserWith(user: IUser, obj: object) {
  try {
    const params = {
      TableName: "users",
      Key: { _id: user._id },
      UpdateExpression: "set #attrName = :attrValue",
      ExpressionAttributeNames: {
        "#attrName": Object.keys(obj)[0],
      },
      ExpressionAttributeValues: {
        ":attrValue": Object.values(obj)[0],
      },
      ReturnValues: "UPDATED_NEW",
    };
    const result = await ddbDocClient.send(new UpdateCommand(params));
    return result.Attributes;
  } catch (error) {
    console.error("Failed to update user: ", error);
    return null;
  }
}

export async function verifyUserCode(verifyCodeDto: IVerifyCode): Promise<{ isVerified: boolean; id: string | undefined }> {
  try {
    let isVerified = false;
    const params = {
      TableName: "users",
      Key: verifyCodeDto,
    };
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    if (Item) {
      const updateParams = {
        TableName: "users",
        Key: { _id: Item._id },
        UpdateExpression: "set isVerified = :isVerified remove verificationCode, verificationCodeExpiry",
        ExpressionAttributeValues: {
          ":isVerified": true,
        },
        ReturnValues: "UPDATED_NEW",
      };
      const result = await ddbDocClient.send(new UpdateCommand(updateParams));
      isVerified = result.Attributes.isVerified;
    }
    return { isVerified, id: Item?._id };
  } catch (error) {
    console.error("Unable to verify Code, ", error);
    return { isVerified: false, id: undefined };
  }
}

export async function verifyGuestToken(token: string): Promise<boolean> {
  try {
    const currentDate = new Date().toISOString();
    const params = {
      TableName: "guestTokens",
      Key: { token: token },
      FilterExpression: "expiry > :currentDate",
      ExpressionAttributeValues: {
        ":currentDate": currentDate,
      },
    };
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    return !!Item;
  } catch (error) {
    console.error("Failed to verify guest token:", error);
    return false;
  }
}

export async function saveNewGuestToken(token: IGuestToken) {
  try {
    const params = {
      TableName: "guestTokens",
      Item: token,
    };
    const result = await ddbDocClient.send(new PutCommand(params));
    return result;
  } catch (error) {
    console.error("Failed to save token into DB: ", error);
  }
}
