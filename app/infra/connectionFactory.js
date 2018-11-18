var mysql = require('mysql');

var connectToMySQL = function() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'casadocodigo_nodejs'
  });
}

// Wrapper. Só é chamada no momento que carregar o objeto. Isso evita o carregamento automático
module.exports = function() {
  return connectToMySQL;
}