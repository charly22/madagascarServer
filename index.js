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
    baseUrl: 'https://api.olapic.com/',
    restrictTo: [
      'api.olapic.com',
      'rest.photorank.me',
      'rest.local.photorank.me',
    ],
  },
  batchMaxSize: 50,
  defaultHeaders: {
    Accept: 'application/json'
  }
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/', function(req, res){
  gate(req.body, function(responses) {
    res.send((res.err ? 500 : 200), responses);
  });
});

app.get('/', function(req, res){
  res.send(400, {error: 'Bad request'});
});

app.listen(conf.port);
