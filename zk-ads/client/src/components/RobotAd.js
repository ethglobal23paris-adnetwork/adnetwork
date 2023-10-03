import React, { useState } from "react";
import { Button } from "@mui/material";
import AdCardVote from "./AdCardVote";
import { BACKEND_URL } from "../helpers/config";

const AdsList = () => {
  const [ad, setAd] = useState();
  const [error, setError] = useState(null); // Add state for error

  const fetchAI = async () => {
    try {
      setError(null); // Clear any previous errors
      const response = await fetch(`${BACKEND_URL}/ai`);
      if (!response.ok) {
        throw new Error("Failed to fetch ai ads.");
      }
      const data = await response.json();
      setAd(data);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setError(error.message); // Set the error message in state
    }
  };

  return (
    <>
      <Button onClick={fetchAI} variant="contained" color="primary">
        Fetch me an ad!
      </Button>
      {error ? ( // Display error message if an error occurred
        <p>Error: {error}</p>
      ) : (
        <AdCardVote ad={ad} />
      )}
    </>
  );
};

export default AdsList;
