import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { handleRatingChange } from "../helpers/xmtp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";
import AdDisplay from "./AdDisplay";




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

  return (
    <Box>
      <ToastContainer />
      <AdDisplay ad={ad} onRatingChange={onRatingChange} user={user} />
    </Box>
  );
};

export default AdCardVote;
