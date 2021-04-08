'use strict'


const express = require('express');
const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient('http://localhost:5001'); //connect to daemon server
const app = express();


// This line tells express where all of our public stuff OR FRONT END STUFF IS AT 
// app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // traverse one folder back and use public folder


// Specifying the Root Route
app.get('/', (req, res) =>{
    // return res.sendFile('index.html');
    return res.send('welcome to my IPFS app!');
});


app.post('/profile', upload.single('avatar'), (req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    try{
        console.log(req.file)
        console.log('adding to buffer...')
        const file = {path: req.file.path, content: Buffer.from(fs.readFileSync(req.file.path))}
        
        console.log("file: ", file);
        console.log("adding to ipfs...")

        const fileAdded = await ipfs.add(file)
        console.log("file returned from ipfs: ", fileAdded)
        const fileHash = fileAdded.cid.toV0();
        return res.send(`https://gateway.ipfs.io/ipfs/${fileHash}`);
    } catch(error){
      console.error(error);
    }
})


app.listen(3000, () =>{
    console.log('Server Listening on port 3000');
});

