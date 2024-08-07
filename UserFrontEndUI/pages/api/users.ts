// aws.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: "eu-north-1",
//   });

// const dynamoDB = new aws.DynamoDB.DocumentClient();

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

    
export default async function asyncFunctionHandler(req: any, res: any) {
    if (req.method === 'GET') {
    try {
        const command = new GetCommand({
            TableName: "users",
            Key: {
                id: "1"
            },
          });
        
          const data = await docClient.send(command);
          console.log(data);
          res.status(200).json(data.Item);
        
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}