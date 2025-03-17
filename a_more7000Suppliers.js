// task4.js
import connect from "./connect.js";

async function findBigSuppliers() {
  const db = await connect();
  
  try {
    const pipeline = [
      { $unwind: "$suppliers" },
      {
        $group: {
          _id: "$suppliers.supplierId",
          total: { $sum: "$suppliers.price" }
        }
      },
      { $match: { total: { $gt: 70000 } } }
    ];

    const suppliers = await db.collection("Products").aggregate(pipeline).toArray();
    
    const supplierInfo = await db.collection("Suppliers").find({
      _id: { $in: suppliers.map(s => s._id) }
    }).toArray();

    console.table(supplierInfo.map(s => ({
      "Supplier Name": s.name,
      "City": s.address?.city || "Unknown"
    })));

  } finally {
    await db.client.close();
  }
}

findBigSuppliers();