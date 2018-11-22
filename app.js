var app = require('./config/express')();    // Importação do Express
var http = require('http').Server(app);     // Importamos o http.Server para passar para o socket.io
var io = require('socket.io')(http);        // Importamos o socket.io para rececber e enviar requisições em tempo real

app.set('io', io);

http.listen(3000, function(){
  console.log('Servidor rodando na porta 3000!');
});