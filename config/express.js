
// O código que não precisa ser carregado o tempo inteiro, fica fora do module.exports
var express = require('express');                     //Carrega o módulo Express
var load = require('express-load');                   // Carrega o módulo Express Load
var bodyParser = require('body-parser');              // Carrega o body-parser
var expressValidator = require('express-validator');  // Carrega o Express Validator

module.exports = function() {
  var app = express();
  app.use(express.static('./app/public'));  // '.static', função que trata o caminho da pasta com os arquivos estáticos da aplicação
  app.set('view engine', 'ejs');            // Seta a view engine do EJS - Embedded Javascript
  app.set('views', './app/views');          // Seta o caminho da pasta 'views' dentro de 'app'

  // use - Funções que serão aplicada ao request na ordem definida
  app.use(bodyParser.urlencoded({extended: true})); // bodyParser.urlencoded - transforma a requisição em json
  app.use(bodyParser.json());                       // Permite o envio de dados no formato json
  app.use(expressValidator());



  // Carrega as rotas no Express
  load('routes', {cwd:'app'})
    .then('infra')
    .into(app);

  // Middleware do express criado para interceptar rotas não encontradas - a ordem é importante!
  app.use(function(req, res, nest) {
    res.status(404).render('erros/404');
    next();
  });

  // Middleware que é executado em ordem anterior caso ocorra um erro
  app.use(function(error, req, res, next) {
    if (process.env.NODE_ENV == 'production') {
      res.status(500).render('erros/500');
      return;
    }
    next(error);
  });

  return app;
};
