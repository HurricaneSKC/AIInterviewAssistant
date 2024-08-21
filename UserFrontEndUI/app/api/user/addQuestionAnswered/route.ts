import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

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

    // Use both partitionKey and sortKey
    const params = {
      TableName: 'users',
      Key: { 
        email: email,  // Use the partition key
        id: email      // Use the sort key, assuming 'id' is the same as 'email' or adjust accordingly
      },
      UpdateExpression: 'SET questionsAnswered = list_append(questionsAnswered, :newQuestion)',
      ExpressionAttributeValues: {
        ':newQuestion': [questionAnswered],
      },
    };

    await client.update(params);
    return NextResponse.json({ message: 'Question added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating questionsAnswered:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}