import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StoryDetail = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/stories/${id}`)
            .then(response => setStory(response.data))
            .catch(error => console.error('Error fetching story:', error));
    }, [id]);

    const handleDelete = async () => {
        await axios.delete(`http://localhost:3000/stories/${id}`);
        navigate('/stories');
    };

    return (
        story && (
            <div>
                <h2>{story.title}</h2>
                <p>{story.content}</p>
                <button onClick={handleDelete}>Delete Story</button>
            </div>
        )
    );
};

export default StoryDetail;
