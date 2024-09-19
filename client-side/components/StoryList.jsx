import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StoryList = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/stories')
            .then(response => setStories(response.data))
            .catch(error => console.error('Error fetching stories:', error));
    }, []);

    return (
        <div>
            <h1>Community Stories</h1>
            <ul>
                {stories.map(story => (
                    <li key={story._id}>
                        <Link to={`/stories/${story._id}`}>{story.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StoryList;
