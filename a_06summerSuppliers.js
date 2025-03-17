
import connect from "./connect.js";

async function getPrinterSuppliers() {
  const db = await connect();
  
  try {
    // Step 1: Find all printer products
    const products = await db.collection("Products").find({
      name: "Printer",
      "suppliers.date": {
        $gte: new Date("2006-06-01"),
        $lte: new Date("2006-08-31")
      }
    }).toArray();

    // Step 2: Extract the supplier ID
    const supplierIds = products.flatMap(p => 
      p.suppliers
        .filter(s => s.date >= new Date("2006-06-01") && s.date <= new Date("2006-08-31"))
        .map(s => s.supplierId)
    );

    // Step 3: Get supplier details
    const suppliers = await db.collection("Suppliers").find({
      _id: { $in: supplierIds }
    }, {
      projection: { name: 1, phoneNumber: 1 }
    }).toArray();

    console.table(suppliers.map(s => ({
      "Supplier Name": s.name,
      "Contact Number": s.phoneNumber
    })));

  } finally {
    await db.client.close();
  }
}

getPrinterSuppliers();