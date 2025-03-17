// connect.js
import { MongoClient } from "mongodb";

const uri = "mongodb://dev:dev@127.0.0.1:27017/LiZiyuanCmpWrld";
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Successfully connected to the database");
    return client.db("LiZiyuanCmpWrld");
  } catch (err) {
    console.error("Execution error:", err);
    process.exit(1);
  }
}

export default connect;