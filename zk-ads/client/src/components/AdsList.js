import React, { useEffect, useState } from 'react';
import { List, ListItem, Button } from '@mui/material';
import AdCardItem from './AdCardItem';

const AdsList = () => {
  const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      const response = await fetch('http://localhost:8000/ads');
      if (!response.ok) {
        throw new Error('Failed to fetch ads.');
      }
      const data = await response.json();
      console.log('ads data', data);
      setAds(data);
    } catch (error) {
      console.error('Error fetching ads:', error);
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
      <Button variant="contained" onClick={handleRefresh}>
        Refresh
      </Button>
      <List>
        {ads.map((ad) => (
          <ListItem key={ad.ad_id}>
            <AdCardItem ad={ad} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AdsList;