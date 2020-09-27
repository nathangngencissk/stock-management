const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Locale = require('./models/Locale');
const Address = require('./models/Address');

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

app.get('/add', (req, res) => {
    address = new Address({
        cep: '80540220',
        state: 'PR',
        city: 'Curitiba',
        district: 'Ahu',
        street: 'R Emílio Cornelsen',
        number: '71',
        complement: 'Estacionamento'
    })

    address.save(function (err, add) {
        locale = new Locale({
            addresses: [add]
        });

        locale.save(function (err, results) {
            console.log(results);
            res.json(results._id);
        });
    });
})

app.get('/', (req, res) => {
    Locale.find()
        .then(locales => {
            res.json(locales);
        })
        .catch(error => res.status(500).json(error));
})

app.listen(9000, () => console.log('Server ativo na porta 9000'));