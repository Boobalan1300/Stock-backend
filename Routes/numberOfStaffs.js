const express = require('express');
const router = express.Router();
const StaffUser = require('../Models/Staff'); 

router.get('/staff/:adminId', async (req, res) => {
    try {
        const { adminId } = req.params;
        const staff = await StaffUser.find({ adminId }); 
        res.json(staff);
    } catch (error) {
        console.error('Error fetching staff data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete("/delete/:email", async (req, res) => {
    try {
      const { email } = req.params;
    
      const deletedStaff = await StaffUser.findOneAndDelete({ email });
      console.log("Deleted staff member:", deletedStaff.email);
      res.status(200).json({ message: "Staff member deleted successfully" });
    } catch (error) {
      console.error("Error deleting staff member:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
