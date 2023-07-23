import React, { useState } from "react";
import { Button } from "@mui/material";
import AdCardVote from "./AdCardVote";
import { BACKEND_URL } from "../helpers/config";

const AdsList = () => {
  const [ad, setAd] = useState();

  const fetchAI = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/ai`);
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

  return (
    <>
      <AdCardVote ad={ad} />
      <Button onClick={fetchAI}>Recommend me!</Button>
    </>
  );
};

export default AdsList;
