import React, { useEffect, useState } from "react";
import { List, ListItem, Button } from "@mui/material";
import AdCardVote from "./AdCardVote";
import { BACKEND_URL } from "../helpers/config";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null); // Add state for error

  const fetchAds = async () => {
    try {
      setError(null); // Clear any previous errors
      const response = await fetch(`${BACKEND_URL}/ads`);
      if (!response.ok) {
        throw new Error("Failed to fetch ads.");
      }
      const data = await response.json();
      setAds(data);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setError(error.message); // Set the error message in state
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleRefresh = () => {
    fetchAds();
  };

  return (
    <>
      <Button onClick={handleRefresh}>Refresh</Button>
      {error ? ( // Display error message if an error occurred
        <p>Error: {error}</p>
      ) : (
        <List>
          {ads.map((ad) => (
            <ListItem key={ad.ad_id}>
              <AdCardVote ad={ad} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default AdsList;
