const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

mongoose
    .connect('mongodb://db:27017/stock', {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(result => {
        console.log('MongoDB Conectado');
    })
    .catch(error => {
        console.log(error);
    });
app.get('/', (req, res) => {
    res.json('Hello World')
})

app.listen(9000, () => console.log('Server ativo na porta 9000'));