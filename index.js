const express = require('express');
const {spawn} = require('child_process');
const app = express();
const port = process.env.PORT || 3000

const img_name = "child.jpg";

app.get('/', (req, res) => {
    var dataToSend;
    var a = [];
    // spawn new child process to call the python script
    const python = spawn('python', ['script1.py', img_name]);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        a.push(dataToSend);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
    });
    
});

app.listen(port, () => {
    console.log('Sever on port ', port);
});