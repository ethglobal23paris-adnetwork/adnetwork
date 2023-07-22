import React, { useEffect, useState } from 'react';
import { Card, CardMedia, Chip, CircularProgress, Typography } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import { ipfs_retrieve } from '../helpers/ipfs';

const AdCardItem = ({ ad }) => {
  const [imageURL, setImageURL] = useState('https://pbs.twimg.com/media/FyalsUSaEAAQ-RU.jpg');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');


  useEffect(() => {
    // Fetch image from web3.storage using the CID
    const fetchImage = async () => {
      try {
        const response = await ipfs_retrieve(ad.cid);
        if (!response.ok) {
          throw new Error('Failed to fetch image from web3.storage.');
        }
        // Assuming the response contains a Blob representing the image
        const files = await response.files();
        for (const file of files) {
          console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
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
        console.error('Error fetching image:', error);
        setLoading(false); // Set loading to false if there is an error
      }
    };

    fetchImage();
  }, [ad.cid]);

  if (!ad) {
    return null;
  }



  return (
    <Card sx={{ position: 'relative', margin: '1em' }}>
      {loading ? (
        // Show a CircularProgress spinner while loading the image
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      ) : (
        // Show the CardMedia with the image once it's loaded
        <CardMedia
          component="img"
          alt="Ad image"
          height="200"
          image={image ? image : imageURL}
        />
      )}
      <Typography variant="h6" component="div" sx={{ margin: '1em 0' }}>
        Ad ID: {ad.ad_id}
      </Typography>
      <Typography variant="body1" sx={{ margin: '0.5em 0' }}>
        Wallet ID: {ad.wallet_id}
      </Typography>
      <Typography variant="body1" sx={{ margin: '0.5em 0' }}>
        CID: {ad.cid}
      </Typography>
      <Typography variant="body1" sx={{ margin: '0.5em 0' }}>
        Keywords: {ad.keywords}
      </Typography>
      <Typography variant="body1" sx={{ margin: '0.5em 0' }}>
        PPC: {ad.ppc}
      </Typography>
      <Typography variant="body1" sx={{ margin: '0.5em 0' }}>
        Timestamp: {ad.timestamp}
      </Typography>
      <Chip
        icon={<PreviewIcon />}
        label="Advertiser's Preview"
        size="small"
        color="primary"
        sx={{ position: 'absolute', bottom: 5, right: 5 }}
      />
    </Card>
  );
};

export default AdCardItem;
