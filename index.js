const express = require('express');

const app = express();

const port = 8000;

app.get('/', function (req, res) {
	res.sendFile('index.html', {root: __dirname});  
});

app.use("/dist/", express.static(__dirname + '/dist'));

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 