const express = require('express');
const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient('http://localhost:5001');
const app = express();

// This line tells express where all of our public stuff OR FRONT END STUFF IS AT 
app.use(express.static('public'), express.json());


// Specifying the Root Route
app.get('/', (req, res) =>{
    return res.sendFile('index.html');
    // return res.send('HELLO WORLD');
});

app.listen(3000, () =>{
    console.log('Server Listening on port 3000');
});

