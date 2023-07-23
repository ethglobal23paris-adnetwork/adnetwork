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
/*
async function getFiles (path) {
    console.log("hello")
    const files = await getFilesFromPath(path)
    console.log(`read ${files.length} file(s) from ${path}`)
    return files
}


async function storeFiles (files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
  }
*/

app.post('/try',upload.single('image'), async(req,res) =>{
  console.log("trying");
  const { originalname, buffer } = req.file;
  console.log(buffer);
  res.status(200).json({ message: 'This is a test endpoint.' });
})



app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    console.log("trying1");
    const { originalname, buffer } = req.file;
    const redirectUrl = req.body.redirectUrl || '/';
    console.log("trying");

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

  app.get('/test', (req, res) => {
    res.status(200).json({ message: 'This is a test endpoint.' });
  });
  


  app.get('/all_ads', (req, res) => {
    res.status(200).json(result);
  });

  app.get('/ad', (req, res) => {
    const adName = req.query.adName
    res.status(200).json(result);
  });


