import db from "./connect.js";

const prods = await db.collection('Suppliers')
    .aggregate([
        {
            $lookup: {
                from: "Products",
                localField: "_id",
                foreignField: "suppliers.supplierId",
                as: "products",
            },
        },
    ]
    ).toArray();


console.log(JSON.stringify(prods, null, 2));

