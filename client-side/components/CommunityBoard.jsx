import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Import Navbar

const CommunityBoard = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null); // To handle errors
  const [isEditing, setIsEditing] = useState(false); // To track if editing
  const [editStory, setEditStory] = useState({
    _id: "",
    title: "",
    content: "",
  }); // Story being edited

  // Fetch stories from the backend API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://localhost:3000/stories");

        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }

        const data = await response.json();
        setStories(data); // Set the fetched stories to state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStories(); // Call the fetch function
  }, []);

  // Handle delete story
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/stories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the story from the UI
        setStories(stories.filter((story) => story._id !== id));
      } else {
        throw new Error("Failed to delete story");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle edit button click - set the story to be edited
  const handleEdit = (story) => {
    setIsEditing(true);
    setEditStory(story); // Set the story in the form fields
  };

  // Handle updating the story (save changes)
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/stories/${editStory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editStory.title,
            content: editStory.content,
          }),
        }
      );

      if (response.ok) {
        const updatedStory = await response.json();
        // Update the story in the UI
        setStories(
          stories.map((story) =>
            story._id === updatedStory._id ? updatedStory : story
          )
        );
        setIsEditing(false); // Close the edit form
        setEditStory({ _id: "", title: "", content: "" });
      } else {
        throw new Error("Failed to update story");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
      <h1>Community Board</h1>
      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* If no stories, show a loading message */}
      {stories.length === 0 && !error && <p>Loading stories...</p>}
      <ul>
        {stories.map((story) => (
          <li key={story._id}>
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <button onClick={() => handleEdit(story)}>Edit</button>
            <button onClick={() => handleDelete(story._id)}>Delete</button>
            {isEditing && (
              <div>
                <h2>Edit Story</h2>
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    name="title"
                    value={editStory.title}
                    onChange={(e) =>
                      setEditStory({ ...editStory, title: e.target.value })
                    }
                    placeholder="Title"
                  />
                  <textarea
                    name="content"
                    value={editStory.content}
                    onChange={(e) =>
                      setEditStory({ ...editStory, content: e.target.value })
                    }
                    placeholder="Your story..."
                  />
                  <button type="submit">Save Changes</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* Edit Story Form */}
    </div>
  );
};

export default CommunityBoard;
