// Note: This setup is only appropriate for serverless environments
// it keeps the connection open and cached across invocations,
// and relies on the serverless platform to clean up resources when the function execution completes.

// If we need to run in Non-Serverless Environment,
// we can use the below function to close the connection at appropriate times,
// such as on shutdown or at the end of a script.

// export async function closeDatabase() {
//   if (client) {
//     await client.close();
//     console.log("DynamoDB connection closed.");
//   }
// }

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
import { IGuestToken, IUser } from "./db.types";

dotenv.config();

if (!process.env.AWS_REGION) {
  throw new Error('Invalid/Missing environment variable: "AWS_REGION"');
}

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export let guestTokensCollection;
export let usersCollection;

export async function connectToDatabase() {
  if (guestTokensCollection && usersCollection) return;
  try {
    guestTokensCollection = ddbDocClient;
    usersCollection = ddbDocClient;
    console.log("DynamoDB connection and collections initialization achieved.");
  } catch (error) {
    console.error("DynamoDB connection failed:", error);
    throw error;
  }
}

// Immediately initialize the database connection and collections
(async () => {
  await connectToDatabase();
})();
