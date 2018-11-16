var app = require('./config/express')();



app.get('/produtos', function(res, res) {
  // res.send('<html><body><h1>Listagem de Produtos</h1></body></html>');
  res.render('produtos/lista');
});

app.listen(3000, function(){
  console.log('Servidor rodando!');
});