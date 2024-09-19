import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StoryForm = ({ initialData = { title: '', content: '' }, storyId }) => {
    const [story, setStory] = useState(initialData);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (storyId) {
            await axios.put(`http://localhost:3000/stories/${storyId}`, story);
        } else {
            await axios.post('http://localhost:3000/stories', story);
        }

        navigate('/stories');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStory({ ...story, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={story.title} onChange={handleChange} placeholder="Title" />
            <textarea name="content" value={story.content} onChange={handleChange} placeholder="Content"></textarea>
            <button type="submit">Save Story</button>
        </form>
    );
};

export default StoryForm;
