'use strict'


const express = require('express');
const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient('http://localhost:5001'); //connect to daemon server
const app = express();


// This line tells express where all of our public stuff OR FRONT END STUFF IS AT 
app.use(express.json());
// app.use(express.static('public'), express.json());


// Specifying the Root Route
app.get('/', (req, res) =>{
    // return res.sendFile('index.html');
    return res.send('welcome to my IPFS app!');
});


app.post('/upload', async (req, res) => {
	const data = req.body;
	console.log(data);
    const fileHash = await addFile(data)
    return res.send(`https://gateway.ipfs.io/ipfs/${fileHash}`);
})


const addFile = async ({path, content}) => {
	const file = {path: path, content: Buffer.from(content)}
	const fileAdded = await ipfs.add(file)
    console.log("file return from ipfs: ", fileAdded)
    return fileAdded.cid.toV0();
}



app.listen(3000, () =>{
    console.log('Server Listening on port 3000');
});

