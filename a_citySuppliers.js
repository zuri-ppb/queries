// task2.js
import connect from "./connect.js";

async function countSuppliersByCity() {
  const db = await connect();
  
  try {
    const result = await db.collection("Suppliers").aggregate([
      { 
        $group: { 
          _id: "$address.city", 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { _id: 1 } }
    ]).toArray();

    console.table(result.map(item => ({
      "City": item._id || "Unknown Region",
      "Number of Suppliers": item.count
    })));

  } finally {
    await db.client.close();
  }
}

countSuppliersByCity();