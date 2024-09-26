// app/lib/dynamodb.ts
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AUTH_DYNAMODB_ID ?? "",
    secretAccessKey: process.env.AUTH_DYNAMODB_SECRET ?? "",
  },
  region: process.env.AUTH_DYNAMODB_REGION,
};

export const dynamoDbClient = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});