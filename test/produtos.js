// Chamamos o express para passar para o supertest para disparar as reuisições sem subir o servidor
var express = require('../config/express')();
var request = require('supertest')(express); // Biblioteca para facilitar a construção do teste


describe('#ProdutosController', function () {

  it('#Listagem json', function (done) {
    // NUma requisição assincrona, devemos chamar a função 'done();' para
    // avisar o MOcha que a execução da requisição acabou, para que o teste seja realizado
    request.get('/produtos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done());
  });

  it('#Listagem HTML', function (done) {
    request.get('/produtos')
      .expect('Content-Type', /html/)
      .expect(200, done());
  });

  it('#Cadastro de novo produto com dados INVÁLIDOS', function (done) {
    request.post('/produtos')
      .send({titulo:'', descricao:'Novo livro'})
      .expect(400, done());
  });

  it('#Cadastro de novo produto com dados VÁLIDOS', function (done) {
    request.post('/produtos')
      .send({titulo:'Livro de teste', descricao:'Novo livro', preco: 49.90})
      .expect(302, done());
  });
  
});