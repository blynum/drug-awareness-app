const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')
require('dotenv').config();


//Middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files (for images)
app.use(morgan('dev'));  // Logging


// Connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

connectToMongoDB();

//Routes
const drugRoutes = require('./routes/drugRoutes');
app.use('/api', drugRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
