const Owner = require('../models/Owner')

module.exports = () => {
    const controller = {};
    
    controller.getAll = (req, res) => {
        Owner.find()
            .then(owners => {
                res.status(200).json(owners);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newOwner = new Owner({
            name: req.body.name,
            cpf: req.body.cpf,
            cnpj: req.body.cnpj
        });

        newOwner
            .save()
            .then(owner => {
                res.json(owner);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newOwner = new Owner({
            _id: req.params.id,
            name: req.body.name,
            cpf: req.body.cpf,
            cnpj: req.body.cnpj
        });

        Owner.findOneAndUpdate({ _id: req.params.id }, newOwner, { new: true })
            .then(owner => {
                res.json(owner);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Owner.findOneAndDelete({ _id: req.params.id })
            .then(owner => {
                res.json(owner);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}