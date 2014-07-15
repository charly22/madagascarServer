var express = require('express'),
    madagascar = require('madagascar'),
    bodyParser = require('body-parser'),
    app = express(),
    gate;

app.use(bodyParser.json());

gate = madagascar({
  domains: {
    baseUrl: 'https://api.olapic.com/',
    restrictTo: [
      'api.olapic.com',
      'rest.photorank.me'
    ],
    batchMaxSize: 50
  }
});

app.post('/', function(req, res){
  gate(req.body, function(responses) {
    res.send(responses);
  });
});

app.listen(8081);
