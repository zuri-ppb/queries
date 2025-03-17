// task3.js
import connect from "./connect.js";

async function calculateTotalStockValue() {
  const db = await connect();
  
  try {
    const result = await db.collection("Products").aggregate([
      {
        $project: {
          stock: 1,
          minPrice: { $min: "$suppliers.price" }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ["$stock", "$minPrice"] } }
        }
      }
    ]).toArray();

    console.log("Total value of inventory:", result[0]?.total || 0);

  } finally {
    await db.client.close();
  }
}

calculateTotalStockValue();