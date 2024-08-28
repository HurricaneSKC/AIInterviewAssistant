// pages/api/auth/reset-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcryptjs';

const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID ?? "",
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET ?? "",
  },
  region: process.env.AUTH_DYNAMODB_REGION,
}));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { token, password } = req.body;

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
      return res.status(400).json({ message: 'Invalid or expired reset token' });
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

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}