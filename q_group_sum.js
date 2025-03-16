import db from "./connect.js";

// total suppliers from each city


const prods = await db.collection('Suppliers')
    .aggregate([
        {
            $group: {
                _id: "$address.city",
                total: { $sum: 1 }
            }
        }

    ]
    )
    .toArray();



console.log(JSON.stringify(prods, null, 2));
