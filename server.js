// // server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');


// const AdminUserRoutes = require('./Routes/signup');
// const protectedRoutes=require('./Routes/protectedRoutes')
// const loginRoutes = require('./Routes/login'); 
// const staffRouter = require('./Routes/StaffData'); 

// // const logoutRoutes=require('./Routes/logout')
// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://boooeditz:boobalandb@cluster0.8f7yl8j.mongodb.net/', { family:4 })
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch(err => console.error('Failed to connect to MongoDB:', err));




// app.use('/api', loginRoutes);
// app.use('/api', AdminUserRoutes);
// app.use('/api', protectedRoutes);
// // app.use('/api', logoutRoutes);
// app.use('/api', staffRouter);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

















// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const AdminUserRoutes = require('./Routes/signup');
const protectedRoutes=require('./Routes/protectedRoutes')
const loginRoutes = require('./Routes/login'); 
const staffRouter = require('./Routes/StaffData');
const numberOfStaff=require('./Routes/numberOfStaffs') 
const productRoutes = require('./Routes/productStore');
const productInStaffPage = require('./Routes/ProductInStaffPage');
const UpdateProduct=require('./Routes/UpdateProduct')
const BrandNames=require('./Routes/Brands')
const SearchPage=require('./Routes/search')
// const logoutRoutes=require('./Routes/logout')
const app = express();
const PORT = process.env.PORT || 3001;


// Set the maximum payload size to 50MB (adjust as needed)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://boooeditz:boobalandb@cluster0.8f7yl8j.mongodb.net/', { family:4 })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));




app.use('/api', loginRoutes);
app.use('/api', AdminUserRoutes);
app.use('/api', protectedRoutes);
// app.use('/api', logoutRoutes);
app.use('/api', staffRouter);
app.use('/api', numberOfStaff);
app.use('/api', productRoutes);

app.use('/api', productInStaffPage);
app.use('/api', UpdateProduct);
app.use('/api', BrandNames);
app.use('/api', SearchPage);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



