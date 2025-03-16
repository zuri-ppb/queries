import { MongoClient } from "mongodb";

const uri = "mongodb://dbadmin:MongoDB03@isit.my.to:27017/";

const client = new MongoClient(uri);
const db = client.db("CmpWrld");
export default db;
