const Address = require('../models/Address');

module.exports = () => {
    const controller = {};

    controller.getAll = (req, res) => {
        Address.find()
            .then(addresses => {
                res.status(200).json(addresses);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newAddress = new Address({
            cep: req.body.cep,
            state: req.body.state,
            city: req.body.city,
            district: req.body.district,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement
        });

        newAddress
            .save()
            .then(address => {
                res.json(address);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newAddress = new Address({
            _id: req.params.id,
            cep: req.body.cep,
            state: req.body.state,
            city: req.body.city,
            district: req.body.district,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement
        });

        Address.findOneAndUpdate({ _id: req.params.id }, newAddress, { new: true })
            .then(address => {
                res.json(address);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Address.findOneAndDelete({ _id: req.params.id })
            .then(address => {
                res.json(address);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}