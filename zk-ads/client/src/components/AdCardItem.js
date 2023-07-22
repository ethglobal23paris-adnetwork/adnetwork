import React from 'react';
import { Card, CardMedia, Chip, Typography } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';

const AdCardItem = ({ ad,  }) => {
  const placeholderImage = 'https://pbs.twimg.com/media/FyalsUSaEAAQ-RU.jpg';
  console.log('ad', ad);
  if (!ad) {
    return null;
  }
  return (
    <Card sx={{ position: 'relative', margin: '1em' }}>
      <CardMedia
        component="img"
        alt="Ad image"
        height="200"
        image={placeholderImage}
      />
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
