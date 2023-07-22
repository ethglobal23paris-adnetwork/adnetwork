import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  adsContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
}));

const AdsList = () => {
  const classes = useStyles();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Fetch ads from the backend
    const fetchAds = async () => {
      try {
        const response = await fetch('http://localhost:8000/ads'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch ads.');
        }
        const data = await response.json();
        setAds(data.ads);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <List className={classes.adsContainer}>
      {ads.slice(0, 100).map((ad) => (
        <ListItem key={ad.ad_id}>
          <ListItemText
            primary={`Ad ID: ${ad.ad_id}, Viewed: ${ad.viewed}, Upload Date: ${ad.upload_date}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AdsList;
