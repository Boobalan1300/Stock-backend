
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const AdminUser = require('../Models/User');


router.post('/adminSignup', async (req, res) => {
  try {
    const { email, password, adminId } = req.body;

   
    if (!email || !password || !adminId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingAdminUser = await AdminUser.findOne({ email });
    if (existingAdminUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }


    const existingAdminId = await AdminUser.findOne({ adminId });
    if (existingAdminId) {
      return res.status(400).json({ error: 'AdminId already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const adminUser = new AdminUser({ email, password: hashedPassword, adminId });


    await adminUser.save();

    console.log('Admin user signed up successfully:', adminUser);
    return res.status(201).send('Admin user signed up successfully');
  } catch (error) {
    console.error('Error signing up admin user:', error);
    return res.status(500).send('Error signing up admin user');
  }
});

module.exports = router;
