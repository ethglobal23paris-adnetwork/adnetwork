import React, { useEffect } from "react";
import { Box, Button, Card, Chip, Typography } from "@mui/material";
import { FlashOn, ThumbUp, ThumbDown } from "@mui/icons-material";
import AdImage from "./AdCardImage";
import moment from "moment";
import { handleRatingChange } from "../helpers/xmtp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../helpers/config";

function calculateRating(upvoteCount, downvoteCount) {
  const totalVotes = upvoteCount + downvoteCount;
  if (totalVotes === 0) {
    return 0; // No votes, return 0
  } else {
    const rating = (5 * upvoteCount) / totalVotes;
    return parseFloat(rating.toFixed(1));
  }
}

const AdCardVote = ({ ad }) => {
  const { user } = useAuth0();
  useEffect(() => {
    console.log("AdCardVote user", user);
  }, [user]);

  const onRatingChange = async (newValue) => {
    handleRatingChange(ad.ad_id, newValue, user.sub, ad.cid);
    const up = newValue === "up";
    if (up) {
      toast.success(`Attest your 👍 vote! 🙏`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // 3 seconds
      });
    } else {
      toast.error(`We got your 👎 vote! 🙈`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // 3 seconds
      });
    }
  };

  if (!ad) {
    return <p>No ads yet...</p>;
  }

  return (
    <Box>
      <ToastContainer />
      <Box
        onClick={async () => {
          console.log("clicked ad", ad);
          const response = await fetch(
            `${BACKEND_URL}/clicked?ad_id=${ad.ad_id}&world_id=${user.sub}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // body: JSON.stringify({
              //   ad_id: ad.ad_id,
              //   world_id: user.sub,
              // }),
            }
          );

          if (!response.ok) {
            console.error("Error fetching ads:", response);
          } else {
            const data = await response.json();
            console.log("data", data);
          }

          window.open(ad.redirect_url, "_blank");
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "center", marginX: "1em 0" }}
        >
          Ad #{ad.ad_id} - {ad.keywords}
        </Typography>
        <Card sx={{ position: "relative", marginX: "1em" }}>
          <AdImage ad={ad} />
          <Box>
            <Button onClick={() => onRatingChange("up")}>
              <ThumbUp style={{ color: "green" }} />
              {ad.upvote_count}
            </Button>
            <Button onClick={() => onRatingChange("down")}>
              <ThumbDown style={{ color: "red" }} />
              {ad.downvote_count}
            </Button>
          </Box>

          <Typography
            variant="subtitle2"
            component="div"
            fullWidth
            sx={{ textAlign: "center", marginX: "1em 0", paddingX: "1em" }}
          >
            IPFS (cid): {ad.cid}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            fullWidth
            sx={{ textAlign: "center", marginX: "1em 0", paddingX: "1em" }}
          >
            Advertiser address: {ad.wallet_id}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            fullWidth
            sx={{ textAlign: "center", marginX: "1em 0", paddingX: "1em" }}
          >
            {calculateRating(ad.upvote_count, ad.downvote_count)} / 5 ⭐️s
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            fullWidth
            sx={{ textAlign: "center", marginX: "1em 0", paddingX: "1em" }}
          >
            PPC: {ad.ppc} 💰
          </Typography>
          <Typography
            sx={{ position: "relative", marginX: "1em", paddingX: "1em" }}
            variant="subtitle2"
            fullWidth
          >
            Uploaded {moment(ad.timestamp).fromNow()}
          </Typography>
          <Chip
            icon={<FlashOn />}
            label="Powered by ZAP⚡️"
            size="small"
            color="info"
            sx={{ position: "relative", margin: "1em", padding: "1em" }}
          />
        </Card>
      </Box>
    </Box>
  );
};

export default AdCardVote;
