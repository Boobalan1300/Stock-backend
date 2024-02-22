const express = require('express');
const router = express.Router();
const StaffUser = require('../Models/Staff');


router.post('/staff', async (req, res) => {
  try {

    const { name, email, password, staffId, adminId, contact } = req.body;


    const staffUser = new StaffUser({
      name,
      email,
      password,
      staffId,
      adminId,
      contact
    });


    await staffUser.save();

    res.status(201).json({ message: 'Staff user created successfully', staffUser });
  } catch (error) {
    console.error('Error creating staff user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
