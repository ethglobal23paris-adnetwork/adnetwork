import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import { Web3Storage } from 'web3.storage';

const AdsUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload to web3.storage
  const handleUpload = async () => {
    if (selectedFile) {
      if (selectedFile.type === 'image/jpeg' && selectedFile.size <= 5 * 1024 * 1024) {
        // Create a web3.storage client
        const client = new Web3Storage({ token: 'YOUR_WEB3_STORAGE_API_TOKEN' });

        // Prepare the data for upload
        const data = [selectedFile];

        try {
          // Upload the file to web3.storage
          const cid = await client.put(data);

          // Handle successful upload
          setUploadStatus(`File uploaded successfully! CID: ${cid}`);
        } catch (error) {
          // Handle upload error
          setUploadStatus('File upload failed. Please try again later.');
        }
      } else {
        setUploadStatus('Please select a JPG file (less than 5 MB) for upload.');
      }
    } else {
      setUploadStatus('Please select a file for upload.');
    }
  };

  return (
    <List>
      <ListItem>
        <input
          type="file"
          accept="image/jpeg"
          onChange={handleFileChange}
        />
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
