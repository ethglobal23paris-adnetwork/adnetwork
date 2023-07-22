import React from 'react';
import { Box, Button, Card, CardMedia, Chip, Typography } from '@mui/material';
import { FlashOn, ThumbUp, ThumbDown } from '@mui/icons-material';

const AdCardVote = ({ onRatingChange }) => {
  return (
    <Box>
      <Typography variant="h5" component="div" sx={{ textAlign: 'center', margin: '1em 0' }}>
        This is the User's View
      </Typography>
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
          color="success"
          sx={{ position: 'absolute', bottom: 5, right: 5 }}
        />
      </Card>
    </Box>
  );
};

export default AdCardVote;
