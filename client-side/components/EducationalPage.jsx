import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Import Navbar
import axios from "axios"; // Import axios for making API requests

const EducationalPage = () => {
  const [drugs, setDrugs] = useState([]); // State to store the list of drugs

  // Fetch the drugs data when the component mounts
  useEffect(() => {
    axios
      .get("/api/drugs") // Replace with your API endpoint
      .then((response) => {
        console.log(response.data);
        setDrugs(response.data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching drugs data:", error);
      });
  }, []);

  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
      <h1>Educational Information on Drugs</h1>
      <p>Learn about the effects, dangers, and details of different drugs.</p>
      {/* Display the list of drugs */}
      <ul>
        {drugs.map((drug) => (
          <li key={drug._id}>
            <h2>{drug.name}</h2>
            <img
              src={`${drug.image}`}
              alt={drug.name}
              style={{ width: "200px", height: "auto" }}
            />
            <p>
              <strong>Description:</strong> {drug.description}
            </p>
            <p>
              <strong>Effects:</strong> {drug.effects}
            </p>
            <p>
              <strong>Risks:</strong> {drug.risks}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationalPage;
