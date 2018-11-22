var app = require('./config/express')();    // Importação do Express
var http = require('http').Server(app);     // Importamos o http.Server para passar para o socket.io
var io = require('socket.io')(http);        // Importamos o socket.io para rececber e enviar requisições em tempo real

app.set('io', io);

var porta = process.env.PORT || 3000;       // Verifica a variável de ambiente do Heroku

var server = http.listen(porta, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Servidor rodando em http://%s:%s', host, port);

});


/*http.listen(3000, function(){
  console.log('Servidor rodando na porta 3000!');
});
*/