
// O código não precisa ser carregado o tempo inteiro, fica fora do module.exports
var app = require('express')();
app.set('view engine', 'ejs'); // Seta a engine do EJS - Embedded Javascript

module.exports = function() {
  return app;
}
