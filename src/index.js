const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

const address = require('./routes/address');
const client = require('./routes/client');
const document = require('./routes/document');
const locale = require('./routes/locale');
const order = require('./routes/order');
const owner = require('./routes/owner');
const product = require('./routes/product');
const shop = require('./routes/shop');
const suppliers = require('./routes/suppliers');
const warehouse = require('./routes/warehouse');

app.use('/api/address', address);
app.use('/api/client', client);
app.use('/api/document', document);
app.use('/api/locale', locale);
app.use('/api/order', order);
app.use('/api/owner', owner);
app.use('/api/product', product);
app.use('/api/shop', shop);
app.use('/api/suppliers', suppliers);
app.use('/api/warehouse', warehouse);

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