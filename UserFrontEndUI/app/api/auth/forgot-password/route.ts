import { NextResponse } from 'next/server';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import crypto from 'crypto';
import { sendResetEmail } from '@/utils/email';

const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID ?? "",
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET ?? "",
  },
  region: process.env.AUTH_DYNAMODB_REGION,
}));

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Check if user exists
    const user = await dynamoDb.send(new GetCommand({
      TableName: 'users',
      Key: { email, id: email },
    }));

    if (!user.Item) {
      // Don't reveal if user exists or not
      return NextResponse.json({ message: 'If an account exists, a reset email has been sent.' }, { status: 200 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Update user with reset token
    await dynamoDb.send(new UpdateCommand({
      TableName: 'users',
      Key: { email, id: email },
      UpdateExpression: 'SET resetToken = :resetToken, resetTokenExpiry = :resetTokenExpiry',
      ExpressionAttributeValues: {
        ':resetToken': resetToken,
        ':resetTokenExpiry': resetTokenExpiry,
      },
    }));

    // Send reset email
    await sendResetEmail(email, resetToken);

    return NextResponse.json({ message: 'If an account exists, a reset email has been sent.' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}