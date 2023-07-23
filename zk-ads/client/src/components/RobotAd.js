import React, { useEffect, useState } from "react";
import { List, ListItem, Button } from "@mui/material";
import AdCardVote from "./AdCardVote";

const AdsList = () => {
  const [ad, setAd] = useState();

  const fetchAI = async () => {
    try {
      const response = await fetch("http://localhost:8000/ai");
      if (!response.ok) {
        throw new Error("Failed to fetch ai ads.");
      }
      const data = await response.json();
      setAd(data);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  useEffect(() => {
    fetchAI();
  }, []);

  const refreshAI = () => {
    fetchAI();
  };

  return (
    <>
      <AdCardVote ad={ad} />

      <Button onClick={refreshAI}>Recommend me!</Button>
    </>
  );
};

export default AdsList;
