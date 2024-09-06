import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID ?? '',
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET ?? '',
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
    const { email, questionAnswered } = await req.json();

    if (!email || !questionAnswered) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const params = {
      TableName: 'questionsAnswered',
      Key: { 
        email: email,
        id: email, // Generate a new unique ID for each question
      },
      UpdateExpression: 'SET questions = list_append(if_not_exists(questionsAnswered, :empty_list), :newQuestion)',
      ExpressionAttributeValues: {
        ':newQuestion': [questionAnswered],
        ':empty_list': [],
      },
    };

    await client.update(params);
    return NextResponse.json({ message: 'Question added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating questionsAnswered:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}