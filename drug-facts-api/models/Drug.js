const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    effects: { type: String, required: true },
    risks: { type: String, required: true },
    image: { type: String }  // Path to the drug's image file
});

const Drug = mongoose.model('Drug', drugSchema);
module.exports = Drug;
