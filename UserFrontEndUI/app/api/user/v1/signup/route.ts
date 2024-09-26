import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID ?? "",
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET ?? "",
  },
  region: process.env.AUTH_DYNAMODB_REGION,
}
 
const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already exists
    const user = await client.get({
      TableName: 'users',
      Key: { email, id: email },
    });

    if (user.Item) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userParams = {
      TableName: 'users',
      Item: {
        id: email,
        name,
        email,
        role: 'user', // Default role
        password_hash: hashedPassword,
        created_at: new Date().toISOString(),
        isActive: true,
      },
    };

    const questionsAnsweredParams = {
      TableName: 'questionsAnswered',
      Item: {
        email: email,
        id: email,
        questionsAnswered: [], // Initialize with an empty array
        usageLimit: 10, // initialize with 10
        usageCount: 0,
      },
    };

    await Promise.all([
      client.put(userParams),
      client.put(questionsAnsweredParams)
    ]);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving user to DynamoDB:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}