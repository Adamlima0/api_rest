const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { application } = require('express');

//diferente
import express from 'express';
import * as dotenv from 'dotenv';
import productRoutes from './src/routes/productRoutes';

dotenv.config({path: '.env'});
// Instânciando o express e definindo uma constante na qual será a porta do servidor
const app = express();
const port = 3000;

//URLENCONDE false -> responsável por remover o encoder do body
app.use(express.urlencoded({ extended: false }));
// . json() -> responsável por permitir que nossas respostas estejam no formato JSON
app.use(express.json());
// Rota GET user
app.use('/store', productRoutes);
// Servidor escutando
app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`);
});

// Rascunho anterior abaixo

app.use(express.json());

const produtos = [ 'fullstack Master' , 'Desenvolvimento de Games' , 'Viver de Youtube'];

// CRUD --> Create, Read, Update, Delete

// Retorna um Curso
app.get('/produtos/:index',(req, res) => {
    const {index} = req.params;

    return res.json(produtos [index]);
})

// Retornar todos os produtos
app.get('/produtos',(req, res) => {
    return res.json(produtos);
});

// Criar um novo Curso
app.post('/produtos',(req, res) => {
    const {name} = req.body;
    produtos.push(name);

    return res.json(produtos);
});

// Atualizar um curso
app.put('/produtos/:index', (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    produtos[index] = name;

    return res.json(produtos);
});

// Deletar um curso
app.delete('/produtos/:index',(req, res) => {
    const {index} = req.params;

    produtos.splice(index, 1)
    return res.json({ message: "O curso foi deletado"});
});



// Start server
app.listen(port, () => {
    console.log(`Server started in http://localhost:${port}`)})

