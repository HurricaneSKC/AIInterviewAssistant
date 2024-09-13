import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBDocument, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { auth } from '@/auth'; // Adjust this import based on your auth file location

// Configure DynamoDB client
const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID ?? "",
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET ?? "",
  },
  region: process.env.AUTH_DYNAMODB_REGION,
};

// Create DynamoDB document client
const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    console.log("route question A", session);
    

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user.email;

    const params = {
      TableName: "questionsAnswered",
      KeyConditionExpression: "email = :email AND id = :id",
      ExpressionAttributeValues: {
        ":email": userEmail,
        ":id": userEmail,
      },
    };

    const result = await client.send(new QueryCommand(params));

    const usageCount = result.Items?.[0]?.usageCount || 0;
    const usageLimit = result.Items?.[0]?.usageLimit || 0;

    const isLimitReached = usageCount === usageLimit;

    return NextResponse.json({ 
      usageCount, 
      usageLimit, 
      isLimitReached 
    }, { status: 200 });
  } catch (error) {
    console.error("Error checking usage limit:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}