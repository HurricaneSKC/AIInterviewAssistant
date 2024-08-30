import { NextResponse } from 'next/server';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcryptjs';

const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID ?? "",
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET ?? "",
  },
  region: process.env.AUTH_DYNAMODB_REGION,
}));

export async function POST(request: Request) {
  const { token, password } = await request.json();

  try {
    // Find user with the reset token
    const result = await dynamoDb.scan({
      TableName: 'users',
      FilterExpression: 'resetToken = :token AND resetTokenExpiry > :now',
      ExpressionAttributeValues: {
        ':token': token,
        ':now': Date.now(),
      },
    });

    if (!result.Items || result.Items.length === 0) {
      return NextResponse.json({ message: 'Invalid or expired reset token' }, { status: 400 });
    }

    const user = result.Items[0];

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and remove reset token
    await dynamoDb.send(new UpdateCommand({
      TableName: 'users',
      Key: { email: user.email, id: user.id },
      UpdateExpression: 'SET password_hash = :password, resetToken = :resetToken, resetTokenExpiry = :resetTokenExpiry',
      ExpressionAttributeValues: {
        ':password': hashedPassword,
        ':resetToken': null,
        ':resetTokenExpiry': null,
      },
    }));

    return NextResponse.json({ message: 'Password has been reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}