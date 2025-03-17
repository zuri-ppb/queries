// task6.js
import connect from "./connect.js";

async function countDecemberSales() {
  const db = await connect();
  
  try {
    const result = await db.collection("Sales").aggregate([
   
      {
        $match: {
          date: {
            $gte: new Date("2006-12-01"),
            $lte: new Date("2006-12-31")
          }
        }
      },
      
      { $unwind: "$productsSold" },
   
      {
        $lookup: {
          from: "Products",
          localField: "productsSold.productId",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      { $unwind: "$productInfo" },
   
      {
        $lookup: {
          from: "Suppliers",
          localField: "productInfo.suppliers.supplierId",
          foreignField: "_id",
          as: "supplierInfo"
        }
      },
      { $unwind: "$supplierInfo" },
     
      {
        $group: {
          _id: "$supplierInfo._id",
          supplierName: { $first: "$supplierInfo.name" },
          totalSold: { $sum: "$productsSold.quantity" }
        }
      },
  
      { $sort: { totalSold: -1 } }
    ]).toArray();

    console.table(result.map(r => ({
      "Supplier ID": r._id,
      "Supplier Name": r.supplierName,
      "Total Sold": r.totalSold
    })));

  } catch (err) {
    console.error("Execution Error:", err);
  } finally {
    await db.client.close();
  }
}

countDecemberSales();