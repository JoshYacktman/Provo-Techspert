const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const mongoURI = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/prv-tchsprt?retryWrites=true&w=majority&appName=prv-tchsprt`;

async function main() {
  const client = new MongoClient(mongoURI);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("prv-tchsprt");

    // Fetch all documents from 'users'
    console.log("\nUsers Collection:");
    const users = await db.collection("users").find().toArray();
    console.log(users);

    // Fetch all documents from 'tokens'
    console.log("\nTokens Collection:");
    const tokens = await db.collection("tokens").find().toArray();
    console.log(tokens);
    const { MongoClient } = require("mongodb");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

main();
