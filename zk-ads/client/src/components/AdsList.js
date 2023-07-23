import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

// just to fake the ads
const ads = [
    {
        ad_id: 1,
        viewed: 12,
    },
    {
        ad_id: 2,
        viewed: 13,
    },
]


const AdsList = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
      // Fetch ads from the backend
      const fetchAds = async () => {
        try {
          const response = await fetch('http://localhost:8000/ads');
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
      <List>
        {ads?.map((ad) => (
          <ListItem key={ad.ad_id}>
            <ListItemText primary={`Ad ID: ${ad.ad_id}, Viewed: ${ad.viewed}`} />
          </ListItem>
        ))}
      </List>
    );
  };

export default AdsList;
