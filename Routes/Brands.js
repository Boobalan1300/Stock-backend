


const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');

router.get('/brands/:adminId', async (req, res) => {
  const { adminId } = req.params;

  try {
    const brandCountAggregate = await Product.aggregate([
      { 
        $match: { 
          productId: adminId, 
          brandName: { $ne: null } 
        } 
      },
      {
        $group: {
          _id: { $toLower: "$brandName" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          brandName: "$_id",
          count: 1
        }
      }
    ]);

    const brandCount = brandCountAggregate.length;
    res.json({ brandCount, brands: brandCountAggregate });
  } catch (error) {
    console.error("Error fetching distinct brand count:", error);
    res.status(500).json({ error: "Error fetching distinct brand count" });
  }
});


router.get('/distinctBrands/:adminId', async (req, res) => {
  const { adminId } = req.params;

  try {
    const distinctBrands = await Product.distinct("brandName", {
      productId: adminId,
      brandName: { $ne: null }
    });

    res.json({ distinctBrands });
  } catch (error) {
    console.error("Error fetching distinct brands:", error);
    res.status(500).json({ error: "Error fetching distinct brands" });
  }
});

module.exports = router;
