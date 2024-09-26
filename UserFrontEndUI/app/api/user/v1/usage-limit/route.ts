// app/api/user/usage-limit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDbClient } from '@/app/lib/dynamodb';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user.email;
    const result = await dynamoDbClient.send(new QueryCommand({
      TableName: "questionsAnswered",
      KeyConditionExpression: "email = :email AND id = :id",
      ExpressionAttributeValues: { ":email": userEmail, ":id": userEmail },
    }));

    const usageCount = result.Items?.[0]?.usageCount || 0;
    const usageLimit = result.Items?.[0]?.usageLimit || 0;
    const isLimitReached = usageCount >= usageLimit;

    return NextResponse.json({ usageCount, usageLimit, isLimitReached }, { status: 200 });
  } catch (error) {
    console.error("Error checking usage limit:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = session.user.email;
    await dynamoDbClient.update({
      TableName: 'questionsAnswered',
      Key: { email, id: email },
      UpdateExpression: 'SET usageCount = if_not_exists(usageCount, :zero) + :inc',
      ExpressionAttributeValues: {
        ':zero': 0,
        ':inc': 1,
      },
    });

    return NextResponse.json({ message: 'Usage count incremented successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error incrementing usage count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}