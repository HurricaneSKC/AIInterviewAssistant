import { NextRequest, NextResponse } from "next/server";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID ?? "",
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET ?? "",
  },
  region: process.env.AUTH_DYNAMODB_REGION,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const params = {
      TableName: "users",
      Key: { email, id: email },
      UpdateExpression: "SET isActive = :isActive",
      ExpressionAttributeValues: {
        ":isActive": true,
      },
    };

    await client.send(new UpdateCommand(params));
    return NextResponse.json({ message: "User reactivated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error reactivating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}