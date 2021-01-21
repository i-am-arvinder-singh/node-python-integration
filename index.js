const express = require('express');
const {spawn} = require('child_process');
const app = express();
const port = process.env.PORT || 3000

// const img_name = "https://farm4.staticflickr.com/3609/3460002981_9121bb0695.jpg";

app.get('/', (req, res) => {
    // console.log(req.query.url)
    const img_name = `${req.query.url}`;
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['script1.py', img_name]);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        var output;
        if(dataToSend) output = dataToSend.split(" ").slice(5).filter(Boolean);
        else output = "";
        res.send(output)
    });
    
});

app.listen(port, () => {
    console.log('Sever on port ', port);
});