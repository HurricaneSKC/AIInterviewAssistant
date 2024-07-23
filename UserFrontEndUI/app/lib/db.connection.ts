// Note: This setup is only appropriate for serverless environments
// it keeps the connection open and cached across invocations,
// and relies on the serverless platform to clean up resources when the function execution completes.

// If we need to run in Non-Serverless Environment,
// we can use the bellow function to close the connection at appropriate times,
// such as on shutdown or at the end of a script.

// export async function closeDatabase() {
//   if (client) {
//     await client.close();
//     console.log("MongoDB connection closed.");
//   }
// }

import { Collection, Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
import { IGuestToken, IUser } from "./db.types";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(uri, options);
let db: Db;
let clientPromise: Promise<MongoClient>;
// Add collections as required
export let guestTokensCollection: Collection<IGuestToken>;
export let usersCollection: Collection<IUser>;

if (process.env.NODE_ENV === "development") {
  // this helps with Hot Module Reload
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;

export async function connectToDatabase() {
  if (db) return;
  try {
    const client = await clientPromise;
    db = client.db();
    // Initialize collections to run operations on.
    guestTokensCollection = db.collection<IGuestToken>("guestTokens");
    usersCollection = db.collection<IUser>("users");
    console.log("MongoDB connection and collections initialization achieved.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

// Immediately initialize the database connection and collections
(async () => {
  await connectToDatabase();
})();
