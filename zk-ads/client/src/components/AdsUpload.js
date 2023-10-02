import React, { useState, useEffect } from "react";
import {
  Input,
  List,
  ListItem,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { makeStorageClient } from "../helpers/ipfs";
import { BACKEND_URL } from "../helpers/config";
import Ethereum from "../helpers/Ethereum";
import LinearProgress from "@mui/material/LinearProgress";

const AdsUpload = () => {
  const [wallet_id, setWalletId] = useState("");
  const [keywords, setKeywords] = useState("");
  const [ppc, setPPC] = useState("");
  const [redirect_url, setRedirectUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0); // Add this state variable

  useEffect(() => {
    // Fetch the wallet ID from MetaMask and pre-populate the field
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setWalletId(accounts[0]);
        })
        .catch((error) => {
          console.error("Error fetching wallet ID:", error);
        });
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const handlePPCChange = (event) => {
    setPPC(event.target.value);
  };

  const handleRedirectChange = (event) => {
    setRedirectUrl(event.target.value);
  };

  const handleUpload = async () => {
    setError("");
    if (!selectedFile) {
      setError("Please select a file for upload.");
      return;
    }

    if (
      selectedFile.type !== "image/jpeg" ||
      selectedFile.size > 5 * 1024 * 1024
    ) {
      setError("Please select a JPG file (less than 5 MB) for upload.");
      return;
    }

    const client = makeStorageClient();

    try {
      // Prepare the data for upload
      const data = [selectedFile];

      // Upload the file to web3.storage
      const cid = await client.put(data);

      // Send the walletId and other data to the backend
      const response = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_id: wallet_id,
          redirect_url: redirect_url,
          keywords: keywords,
          ppc: ppc,
          cid: cid,
        }),
      });

      if (!response.ok) {
        setUploadStatus("Failed to upload file. Please try again later.");
      } else {
        setUploadStatus(`File uploaded successfully! CID: ${cid}`);
        await Ethereum.genAd(wallet_id, cid, redirect_url, keywords);
        setSelectedFile(null);
        setKeywords("");
        setPPC("");
        setRedirectUrl("");
        setUploadProgress(0);
      }
    } catch (error) {
      // Handle upload error
      setUploadStatus("File upload failed. Please try again later.");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        <div style={{ flex: 1, marginRight: "10px" }}>
          <input
            type="file"
            accept="image/jpeg"
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              color="primary"
              component="span"
              className="custom-file-button mb-3"
            >
              Select File
            </Button>
          </label>
        </div>
      </div>
      <TextField
        label="Redirect URL"
        value={redirect_url}
        onChange={handleRedirectChange}
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="AI Recommendation Keywords (separate with commas) e.g. 'car, insurance'"
        value={keywords}
        onChange={handleKeywordsChange}
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Pay Per Click (PPC) Bid (in ETH) e.g. '0.001'"
        value={ppc}
        onChange={handlePPCChange}
        defaultValue={0.001}
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="MetaMask Wallet Address (pre-populated)"
        value={wallet_id || "Please connect MetaMask"}
        disabled
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        fullWidth
      >
        Upload
      </Button>
      {error && (
        <Typography variant="body2" color="error" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <LinearProgress
          variant="determinate"
          value={uploadProgress}
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}
      {uploadStatus && (
        <Typography
          variant="body2"
          color="success"
          style={{ marginTop: "10px" }}
        >
          {uploadStatus}
        </Typography>
      )}
    </div>
  );
};

export default AdsUpload;
