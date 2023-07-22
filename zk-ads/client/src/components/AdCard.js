import React from 'react';
import { Box, Button, Card, CardMedia, Chip } from '@mui/material';
import { FlashOn, ThumbUp, ThumbDown } from '@mui/icons-material';

const AdCard = ({ onRatingChange }) => {
  return (
    <Card sx={{ position: 'relative', margin: '1em' }}>
      <CardMedia
        component="img"
        alt="Ad image"
        height="200"
        image="https://pbs.twimg.com/media/FyalsUSaEAAQ-RU.jpg"
      />
      <Box>
        <Button onClick={() => onRatingChange('up')}>
          <ThumbUp style={{ color: 'green' }} />
        </Button>
        <Button onClick={() => onRatingChange('down')}>
          <ThumbDown style={{ color: 'red' }} />
        </Button>
      </Box>
      <Chip
        icon={<FlashOn />}
        label="Powered by ZAP"
        size="small"
        color="secondary"
        sx={{ position: 'absolute', bottom: 5, right: 5 }}
      />
      {/* ... Other components as before ... */}
    </Card>
  );
};

export default AdCard;
