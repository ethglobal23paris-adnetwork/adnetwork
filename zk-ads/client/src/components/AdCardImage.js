import React, { useEffect, useState } from "react";
import { ipfs_retrieve } from "../helpers/ipfs";
import { Card, CardMedia } from "@mui/material";
import { BACKEND_URL } from "../helpers/config";
import { useAuth0 } from "@auth0/auth0-react";

const AdImage = ({ ad }) => {
  const [imageURL, setImageURL] = useState(
    "https://pbs.twimg.com/media/FyalsUSaEAAQ-RU.jpg"
  );
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const { user } = useAuth0();

  useEffect(() => {
    // Fetch image from web3.storage using the CID
    const fetchImage = async () => {
      try {
        const response = await ipfs_retrieve(ad.cid);
        if (!response.ok) {
          throw new Error("Failed to fetch image from web3.storage.");
        }
        // Assuming the response contains a Blob representing the image
        const files = await response.files();
        for (const file of files) {
          setImageURL(file);
          setLoading(false);

          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result);
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setLoading(false); // Set loading to false if there is an error
      }
    };

    fetchImage();
  }, [ad.cid]);

  if (!ad) {
    return null;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card sx={{ position: "relative", margin: "1em" }}>
      {/* Existing code... */}
      <CardMedia
        component="img"
        alt="Ad image"
        height="200"
        image={image ? image : imageURL}
        onClick={async () => {
          const response = await fetch(
            `${BACKEND_URL}/clicked?ad_id=${ad.ad_id}&world_id=${user.sub}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error("Error fetching ads:", response);
          } else {
            const data = await response.json();
            console.log("data", data);
          }
          console.log("going to:", ad.redirect_url);
          window.open(ad.redirect_url, "_blank");
        }}
      />
    </Card>
  );
};

export default AdImage;
