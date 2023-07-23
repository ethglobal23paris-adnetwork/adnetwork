import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, TextField, Button } from "@mui/material";
import { Web3Storage } from "web3.storage";

const AdsUpload = () => {
  const [wallet_id, setWalletId] = useState("");
  const [keywords, setKeywords] = useState("");
  const [ppc, setPPC] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const YOUR_WEB3_STORAGE_API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ4NjcxQTNlRkMwQWNiOWJCOGRlMTkxRTU3ZjczNGZGYjExRUI4YTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTAwMjgwMTE0MzYsIm5hbWUiOiJ6YXAifQ.w7Y43yX2S0etFLtbzthh3duoO6FYokHvmX-r9_ddElA";

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

  const handleUpload = async () => {
    if (selectedFile) {
      if (
        selectedFile.type === "image/jpeg" &&
        selectedFile.size <= 5 * 1024 * 1024
      ) {
        // Create a web3.storage client
        const client = new Web3Storage({ token: YOUR_WEB3_STORAGE_API_TOKEN });
        // Prepare the data for upload
        const data = [selectedFile];
        try {
          // Upload the file to web3.storage
          const cid = await client.put(data);
          setUploadStatus(`File uploaded successfully! CID: ${cid}`);

          // Send the walletId and keywords to the backend
          const response = await fetch("http://localhost:8000/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              wallet_id: wallet_id,
              keywords: keywords,
              ppc: ppc,
              cid: cid,
            }),
          });

          if (!response.ok) {
            setUploadStatus("Failed to upload file. Please try again later.");
          } else {
            setUploadStatus("File uploaded successfully!");
          }

          // Handle successful upload
          setUploadStatus("File uploaded successfully!");
          setSelectedFile(null);
          setKeywords("");
        } catch (error) {
          // Handle upload error
          setUploadStatus("File upload failed. Please try again later.");
        }
      } else {
        setUploadStatus(
          "Please select a JPG file (less than 5 MB) for upload."
        );
      }
    } else {
      setUploadStatus("Please select a file for upload.");
    }
  };

  return (
    <List>
      <ListItem>
        <TextField
          label="MetaMask Wallet Address (pre-populated)"
          value={wallet_id}
          disabled
        />
      </ListItem>
      <ListItem>
        <TextField
          label="AI Recommendation Keywords (separate with commas) e.g. 'car, insurance'"
          value={keywords}
          onChange={handleKeywordsChange}
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Pay Per Click (PPC) Bid (in ETH) e.g. '0.001'"
          value={ppc}
          onChange={handlePPCChange}
        />
      </ListItem>
      <ListItem>
        <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      </ListItem>
      <ListItem>
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      </ListItem>
      {uploadStatus && (
        <ListItem>
          <ListItemText primary={uploadStatus} />
        </ListItem>
      )}
    </List>
  );
};

export default AdsUpload;
