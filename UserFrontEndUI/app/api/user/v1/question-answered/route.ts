// app/api/user/questions-answered/route.ts
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

    const questionsAnswered = result.Items?.[0]?.questionsAnswered || [];
    return NextResponse.json({ questionsAnswered }, { status: 200 });
  } catch (error) {
    console.error("Error fetching questions answered:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { questionAnswered } = await req.json();
    if (!questionAnswered) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const email = session.user.email;
    await dynamoDbClient.update({
      TableName: 'questionsAnswered',
      Key: { email, id: email },
      UpdateExpression: 'SET questionsAnswered = list_append(if_not_exists(questionsAnswered, :empty_list), :newQuestion)',
      ExpressionAttributeValues: {
        ':newQuestion': [questionAnswered],
        ':empty_list': [],
      },
    });

    return NextResponse.json({ message: 'Question added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating questionsAnswered:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}