const Suppliers = require('../models/Suppliers')

module.exports = () => {
    const controller = {};
    
    controller.getAll = (req, res) => {
        Suppliers.find()
            .then(suppliers => {
                res.status(200).json(suppliers);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newSuppliers = new Suppliers({
            address: req.body.address,
            name: req.body.name,
            cnpj: req.body.cnpj,
            products: req.body.products
        });

        newSuppliers
            .save()
            .then(suppliers => {
                res.json(suppliers);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newSuppliers = new Suppliers({
            _id: req.params.id,
            address: req.body.address,
            name: req.body.name,
            cnpj: req.body.cnpj,
            products: req.body.products
        });

        Suppliers.findOneAndUpdate({ _id: req.params.id }, newSuppliers, { new: true })
            .then(suppliers => {
                res.json(suppliers);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Suppliers.findOneAndDelete({ _id: req.params.id })
            .then(suppliers => {
                res.json(suppliers);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}