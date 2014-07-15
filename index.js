var express = require('express'),
    madagascar = require('madagascar'),
    bodyParser = require('body-parser'),
    app = express(),
    gate;

app.use(bodyParser.json());

app.use(error);
function error(err, req, res, next) {
  console.error(err.stack);
  res.send(400, {error: 'Bad request'});
}

conf = {
  port: process.env.MADAGASCAR_PORT || 8081
};

gate = madagascar({
  domains: {
    restrictTo: [
      'api.olapic.com',
      'rest.photorank.me',
    ],
    batchMaxSize: 30
  },
  defaultHeaders: {
    Accept: 'application/json'
  }
});

app.post('/', function(req, res){
  gate(req.body, function(responses) {
    res.send((res.err ? 200 : 500), responses);
  });
});

app.listen(conf.port);
