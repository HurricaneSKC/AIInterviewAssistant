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

// Define the GET handler for the API route
export async function GET(req: NextRequest) {
  try {
    // Get the authenticated session
    const session = await auth();
    console.log("route question A", session);

    // Check if the user is authenticated
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user's email from the session
    const userEmail = session.user.email;

    // Define the parameters for querying the questionsAnswered table
    const params = {
      TableName: "questionsAnswered",
      KeyConditionExpression: "email = :email AND id = :id",
      ExpressionAttributeValues: {
        ":email": userEmail,
        ":id": userEmail,
      },
    };

    // Execute the query
    const result = await client.send(new QueryCommand(params));

    // Extract the questions from the query result
    const questionsAnswered = result.Items?.[0]?.questionsAnswered || [];

    // Return the questionsAnswered data as JSON
    return NextResponse.json({ questionsAnswered }, { status: 200 });
  } catch (error) {
    // Log any errors that occur
    console.error("Error fetching questions answered:", error);
    // Return a 500 Internal Server Error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}