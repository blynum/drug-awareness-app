const express = require('express');
const router = express.Router();
const Story = require('../models/Story');


// GET all stories
router.get('/', async (req, res, next) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (err) {
        next(err);
    }
});

// GET a story by ID
router.get('/:id', async (req, res, next) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json(story);
    } catch (err) {
        next(err);
    }
});


// POST a new story
router.post('/', async (req, res, next) => {
    try {
        const newStory = new Story(req.body);
        const savedStory = await newStory.save();
        res.status(201).json(savedStory);
    } catch (err) {
        next(err);
    }
});

// PUT (Update) an existing story
router.put('/:id', async (req, res, next) => {
    try {
        const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedStory);
    } catch (err) {
        next(err);
    }
});

// DELETE a story
router.delete('/:id', async (req, res, next) => {
    try {
        await Story.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
