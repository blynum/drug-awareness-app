const express = require('express');
const Drug = require('../models/Drug');
const multer = require('multer');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// GET all drugs
router.get('/drugs', async (req, res) => {
    try {
        const drugs = await Drug.find();
        res.json(drugs);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST a new drug with image upload
router.post('/drugs', upload.single('drugImage'), async (req, res) => {
    const { name, description, effects, risks } = req.body;
    const imagePath = req.file ? req.file.path : null;

    try {
        const newDrug = new Drug({
            name,
            description,
            effects,
            risks,
            image: imagePath,
        });
        await newDrug.save();
        res.json(newDrug);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT (update) a drug
router.put('/drugs/:id', upload.single('drugImage'), async (req, res) => {
    const { name, description, effects, risks } = req.body;
    const imagePath = req.file ? req.file.path : req.body.image;  // Keep old image if not updated

    try {
        const updatedDrug = await Drug.findByIdAndUpdate(
            req.params.id,
            { name, description, effects, risks, image: imagePath },
            { new: true }
        );
        res.json(updatedDrug);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// DELETE a drug
router.delete('/drugs/:id', async (req, res) => {
    try {
        await Drug.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Drug deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
