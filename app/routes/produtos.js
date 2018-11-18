module.exports = function(app) {

  var listaProdutos = function(res, res) {
      var connection = app.infra.connectionFactory();
      var produtosDAO = new app.infra.ProdutosDAO(connection);

      produtosDAO.lista(function(erros, resultados){

        // CONTENT NEGOTIATION: Responde de maneira diferente de acordo com o cliente Mobile-Android/Browser
        res.format({
          html: function() {
            res.render('produtos/lista', {lista: resultados});
          },
          json: function() {
            res.json(resultados);
          }
        });

      });
      connection.end();
    };
  
  // Lista produtos
  app.get('/produtos', listaProdutos);

  // Mostra formulário
  app.get('/produtos/form', function(res, res) {
      res.render('produtos/form');
  });

  // Salva dados dos produtos
  app.post('/produtos', function(req, res) {
    var produto = req.body;
    console.log(produto);

    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.salva(produto, function(erros, resultados) {
      console.log(erros);
      res.redirect('/produtos');
    });

  });
}