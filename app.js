var express = require('express');
var app = express();

app.get('/produtos', function(res, res) {
  res.send('<html><body><h1>Listagem de Produtos</h1></body></html>');
});

app.listen(3000, function(){
  console.log('Servidor rodando!');
});