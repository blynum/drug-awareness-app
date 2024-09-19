import React from "react";
import Navbar from "./Navbar"; // Import Navbar

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Drug Awareness App</h1>
      <Navbar /> {/* Include the Navbar */}
      <p>
        This app raises awareness about drug misuse. Learn more, share stories,
        and connect with the community.
      </p>
    </div>
  );
};

export default Home;
