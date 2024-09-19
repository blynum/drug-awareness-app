const express = require("express");
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(morgan('dev'));  // Logging

// Connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

connectToMongoDB();

// Routes
app.use("/stories", require("./routes/storyRouter"));

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ errorMessage: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
