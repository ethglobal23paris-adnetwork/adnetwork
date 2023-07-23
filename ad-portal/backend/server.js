import { File, Web3Storage } from 'web3.storage'
import { getFilesFromPath } from 'web3.storage'
import express from 'express';
import multer from 'multer';



// Relative path from the scripts folder to the static folder
let uploadPath = '../../static';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ4NjcxQTNlRkMwQWNiOWJCOGRlMTkxRTU3ZjczNGZGYjExRUI4YTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTAwMjgwMTE0MzYsIm5hbWUiOiJ6YXAifQ.w7Y43yX2S0etFLtbzthh3duoO6FYokHvmX-r9_ddElA'

const result = {}


const app = express();

const upload = multer({
  dest: uploadPath
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

function makeStorageClient(){
    return new Web3Storage({token:API_TOKEN})
}

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const redirectUrl = req.body.redirectUrl || '/';

    // Create a single File object from the uploaded image
    const file = new File([buffer], originalname);

    //Convert redirectUrl to a Buffer and create a File object
    const redirectBuffer = Buffer.from(redirectUrl, 'utf-8');
    const redirectFile = new File([redirectBuffer], 'redirectUrl.txt');

    // Store both the image and redirect URL on Web3Storage
    const client = makeStorageClient();
    const cidImage = await client.put([file]);
    const cidRedirect = await client.put([redirectFile]);

    // Store the CIDs as a tuple in the result dictionary
    result[originalname] = [cidImage, cidRedirect];
    
    // Respond with the dictionary
    res.status(200).json(result);
  } catch (err) {
    console.error('Error uploading the file:', err);
    res.status(500).json({ error: 'Error uploading the file' });
  }
});
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });


