import connect from "./connect.js";

async function getSpringOrders() {
  const db = await connect();
  
  try {
    const result = await db.collection("Sales").aggregate([
      {
        $match: {
          date: {
            $gte: new Date("2006-03-01"),
            $lte: new Date("2006-05-31")
          }
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          count: { $sum: 1 } 
        }
      },
      { $sort: { _id: 1 } } 
    ]).toArray();

    const monthNames = ["March", "April", "May"];
    const output = monthNames.map((name, index) => {
      const monthData = result.find(r => r._id === index + 3); 
      return {
        "Month": name,
        "Order Quantity": monthData ? monthData.count : 0 
      };
    });

    console.table(output);

  } finally {
    await db.client.close();
  }
}

getSpringOrders();