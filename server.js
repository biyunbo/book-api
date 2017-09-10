var express = require('express');
var app = express();

var query = require('./utils');

app.get('/', function(req, res) {
 	res.send('hello world');
}).listen(2024);

app.get('/book',function(req, res){
	query(`select * from books`, (err, results) => {
    if (err) throw err
    res.send(results)
  })
});