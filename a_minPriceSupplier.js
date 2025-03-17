// task5.js
import connect from "./connect.js";

async function findMinPriceSuppliers() {
  const db = await connect();
  
  try {
    // 1. 获取所有产品
    const products = await db.collection("Products").find().toArray();
    
    // 2. 收集所有供应商ID
    const supplierIds = products.map(p => 
      p.suppliers.reduce((min, curr) => 
        curr.price < min.price ? curr : min
      ).supplierId
    );

    // 3. 批量获取供应商信息
    const suppliers = await db.collection("Suppliers").find({
      _id: { $in: supplierIds }
    }).toArray();

    // 4. 创建供应商ID到名称的映射
    const supplierMap = new Map(
      suppliers.map(s => [s._id.toString(), s.name])
    );

    // 5. 构建结果集
    const results = products.map(p => {
      const minPriceSupplier = p.suppliers.reduce((min, curr) => 
        curr.price < min.price ? curr : min
      );
      
      return {
        "Product Name": p.name,
        "Minimum Price": minPriceSupplier.price,
        "Supplier ID": minPriceSupplier.supplierId,
        "Supplier Name": supplierMap.get(minPriceSupplier.supplierId.toString()) || "Unknown"
      };
    });

    console.table(results);

  } finally {
    await db.client.close();
  }
}

findMinPriceSuppliers();