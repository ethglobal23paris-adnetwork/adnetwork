import React from "react";
import { Box, Button, Card, Chip, Typography } from "@mui/material";
import { FlashOn, ThumbUp, ThumbDown } from "@mui/icons-material";
import AdImage from "./AdCardImage";
import moment from "moment";

const AdCardVote = ({ ad }) => {
  const onRatingChange = async (newValue) => {
    console.log("rating changed", newValue);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        component="div"
        sx={{ textAlign: "center", margin: "1em 0" }}
      >
        Ad #{ad.ad_id}
      </Typography>
      <Card sx={{ position: "relative", margin: "1em" }}>
        <AdImage ad={ad} />
        <Box>
          <Button onClick={() => onRatingChange("up")}>
            <ThumbUp style={{ color: "green" }} />
          </Button>
          <Button onClick={() => onRatingChange("down")}>
            <ThumbDown style={{ color: "red" }} />
          </Button>
        </Box>

        <Typography
          variant="subtitle2"
          component="div"
          sx={{ textAlign: "center", margin: "1em 0" }}
        >
          IPFS (cid): {ad.cid}
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ textAlign: "center", margin: "1em 0" }}
        >
          Advertiser address: {ad.wallet_id}
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ textAlign: "center", margin: "1em 0" }}
        >
          {ad.rating} / 5 ⭐️s
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ textAlign: "center", margin: "1em 0" }}
        >
          PPC: {ad.ppc} 💰
        </Typography>
        <p>Uploaded {moment(ad.timestamp).fromNow()}</p>
        <Chip
          icon={<FlashOn />}
          label="Powered by ZAP"
          size="small"
          color="info"
          sx={{ position: "relative", margin: "1em" }}
        />
      </Card>
    </Box>
  );
};

export default AdCardVote;
