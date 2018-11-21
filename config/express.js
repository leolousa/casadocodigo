
// O código que não precisa ser carregado o tempo inteiro, fica fora do module.exports

//Carrega o módulo Express
var express = require('express');
// Carrega o módulo Express Load
var load = require('express-load');
// Carrega o body-parser
var bodyParser = require('body-parser');
// Carrega o Express Validator
var expressValidator = require('express-validator');


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

  return app;
};
