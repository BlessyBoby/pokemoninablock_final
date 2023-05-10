var express = require('express');
var app = express();
app.use(express.static('src')); 
app.use(express.static('pokemin-contract/contracts')); 
app.get('/', function (req, res) {
   res.render('index.html');
});
var port = process.env.PORT || 3004;
app.listen(port, function () {
  console.log('Example app listening on port 3004!');
 });
