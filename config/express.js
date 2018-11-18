
// O código que não precisa ser carregado o tempo inteiro, fica fora do module.exports

//Carrega o módulo Express
var express = require('express');
// Carrega o módulo Express Load
var load = require('express-load');

module.exports = function() {
  
  var app = express();

  app.set('view engine', 'ejs'); // Seta a view engine do EJS - Embedded Javascript
  app.set('views', './app/views'); // Seta o caminho da pasta 'views' dentro de 'app'

  // Carrega as rotas no Express
  load('routes', {cwd:'app'})
    .then('infra')
    .into(app);

  return app;
};
