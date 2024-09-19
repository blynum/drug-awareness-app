import React, { useState } from "react";
import Navbar from "./Navbar"; // Import Navbar

const AnonymousSubmission = () => {
  const [story, setStory] = useState({ title: "", content: "" });
  const [error, setError] = useState(null); // To handle errors
  const [successMessage, setSuccessMessage] = useState(""); // To handle success messages

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!story.title || !story.content) {
      setError("Both title and content are required.");
      return;
    }

    try {
      // Clear previous error
      setError(null);

      // Send the form data to the backend API
      const response = await fetch("http://localhost:3000/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(story), // Send the story data
      });

      if (response.ok) {
        const savedStory = await response.json();
        // Clear the form after successful submission
        setStory({ title: "", content: "" });
        setSuccessMessage("Story submitted successfully!");
        console.log("Story submitted successfully", savedStory);
      } else {
        throw new Error("Failed to submit the story. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
      <h1>Submit Your Story</h1>
      {/* Display error or success messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={story.title}
          onChange={(e) => setStory({ ...story, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={story.content}
          onChange={(e) => setStory({ ...story, content: e.target.value })}
          placeholder="Your story..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AnonymousSubmission;
