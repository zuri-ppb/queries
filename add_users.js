import db from "../users_management/connect.js";
import fs from "fs";

async function run() {
    try {

        const result = await db.command({
            dbStats: 1,
        });
        console.log(result);
    } finally {
        await db.client.close();
    }
}


const data = fs.readFileSync('clean_start.json');
const docs = JSON.parse(data.toString());

db.collection('students')
    .insertMany(docs.students, function (err, result) {
        if (err) throw err;
        console.log('Inserted docs:', result.insertedCount);
        client.close();
    });

run().catch(console.dir);
