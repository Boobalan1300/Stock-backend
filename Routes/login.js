


const express = require('express');
const router = express.Router();
const AdminUser = require('../Models/User');
const StaffUser = require('../Models/Staff');
const generateToken = require('./generateToken');
const bcrypt = require('bcrypt');


router.post('/login/admin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const adminUser = await AdminUser.findOne({ email });
        if (!adminUser) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, adminUser.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const tokenPayload = {
            id: adminUser._id,
            email: adminUser.email,
            role: 'admin'
        };
        const token = generateToken(tokenPayload);
        res.json({ token });
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login/supervisor', async (req, res) => {
    const { email, password } = req.body;
    try {
        const supervisorUser = await StaffUser.findOne({ email });
        if (!supervisorUser) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

   
        if (password !== supervisorUser.password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const tokenPayload = {
            id: supervisorUser._id,
            email: supervisorUser.email,
            role: 'supervisor'
        };
        const token = generateToken(tokenPayload);
        res.json({ token });
    } catch (error) {
        console.error('Error logging in supervisor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/adminId/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
     
      const adminUser = await AdminUser.findOne({ email });
  
      if (!adminUser) {
        return res.status(404).json({ message: 'Admin user not found' });
      }
  
    
      res.json({ adminId: adminUser.adminId });
    } catch (error) {
      console.error('Error fetching adminId:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/supervisor/:email', async (req, res) => {
    const { email } = req.params;

    try {
       
        const supervisorUser = await StaffUser.findOne({ email });

        if (!supervisorUser) {
            return res.status(404).json({ message: 'Supervisor user not found' });
        }

       
        res.json({ adminId: supervisorUser.adminId });
    } catch (error) {
        console.error('Error fetching supervisor data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
