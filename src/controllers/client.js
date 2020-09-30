const Client = require('../models/Client')

module.exports = () => {
    const controller = {};
    
    controller.getAll = (req, res) => {
        Client.find()
            .then(clients => {
                res.status(200).json(clients);
            })
            .catch(error => res.status(500).json(error));
        
    }

    controller.add = (req, res) => {
        const newClient = new Client({
            name: req.body.name,
            cpf: req.body.cpf,
            cnpj: req.body.cnpj 
        });

        newClient
            .save()
            .then(client => {
                res.json(client);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newClient = new Client({
            _id: req.params.id,
            name: req.body.name,
            cpf: req.body.cpf,
            cnpj: req.body.cnpj 
        });

        Client.findOneAndUpdate({ _id: req.params.id }, newClient, { new: true })
            .then(client => {
                res.json(client);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Client.findOneAndDelete({ _id: req.params.id })
            .then(client => {
                res.json(client);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}