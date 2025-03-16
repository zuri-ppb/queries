import db from "./connect.js";
import fs from "fs";

const prods = await db.collection('Products')
    .aggregate([
        {
            $lookup: {
                from: "Suppliers",
                localField: "suppliers.supplierId",
                foreignField: "_id",
                as: "producers",
            },
        },
        {
            $project: {
                producers:1,
                id:1
            }            
        },
        { $unwind: "$producers" }
    ]
    ).toArray();

// https://metanit.com/nosql/mongodb/2.7.php
//https://stackoverflow.com/questions/50584694/lookup-nested-array-in-mongodb 
// const prods = await db.collection('Products').find().toArray();
console.log(JSON.stringify(prods, null, 2));
