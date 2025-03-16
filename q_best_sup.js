import db from "./connect.js";

// for each product, find suppliers that supply the product at the lowest price


const prods = await db.collection('Products')
    .aggregate([
        {
            $addFields: {
                minprice: { $min: "$suppliers.price" }
            }
        },
        {
            $project: {
                minprice: 1,
                name: 1,
                suppliers: {
                    $filter: {
                        input: "$suppliers",
                        as: "item",
                        cond: { $eq: ["$$item.price", "$minprice"] }
                    }
                }
            }
        },
        {
            $lookup: {
                from: "Suppliers",
                localField: "suppliers.supplierId",
                foreignField: "_id",
                as: "good producers",
            },
        },


        // {



    ]
    )
    // .project({ minprice: 1, name: 1, _id: 0 })
    .toArray();


// https://metanit.com/nosql/mongodb/2.7.php
//https://stackoverflow.com/questions/50584694/lookup-nested-array-in-mongodb 
// const prods = await db.collection('Products').find().toArray();
console.log(JSON.stringify(prods, null, 2));
