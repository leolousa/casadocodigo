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
      res.render('produtos/form', { errosValidacao: {}, produto: {} });
  });

  // Salva dados dos produtos
  app.post('/produtos', function(req, res) {
    var produto = req.body;

    req.assert('titulo', 'O Título é obrigatório!').notEmpty();
    req.assert('preco','Formato inválido!').isFloat();

    var erros = req.validationErrors();
    if (erros) {
      res.status(400);
      res.format({
        html: function() {
          res.render('produtos/form', {errosValidacao : erros, produto : produto});
        },
        json: function() {
          res.json(erros);
        }
      });
      res.render('produtos/form', {errosValidacao : erros, produto : produto});
      return;
    }

    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.salva(produto, function(erros, resultados) {
      res.redirect('/produtos');
    });

  });
}