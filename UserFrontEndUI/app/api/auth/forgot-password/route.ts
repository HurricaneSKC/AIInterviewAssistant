// pages/api/auth/forgot-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import crypto from 'crypto';
import { sendResetEmail } from '@/utils/email'; // You'll need to implement this

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

  const { email } = req.body;

  try {
    // Check if user exists
    const user = await dynamoDb.send(new GetCommand({
      TableName: 'users',
      Key: { email, id: email },
    }));

    if (!user.Item) {
      // Don't reveal if user exists or not
      return res.status(200).json({ message: 'If an account exists, a reset email has been sent.' });
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

    res.status(200).json({ message: 'If an account exists, a reset email has been sent.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}