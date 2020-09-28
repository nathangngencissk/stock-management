const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

const address = require('./routes/address');

app.use('/api/address', address);

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

app.listen(9000, () => console.log('Server ativo na porta 9000'));