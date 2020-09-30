const Product = require('../models/Product')

module.exports = () => {
    const controller = {};
    
    controller.getAll = (req, res) => {
        Product.find()
            .then(products => {
                res.status(200).json(products);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newProduct = new Product({
            name: req.body.name,
            measuringUnit: req.body.measuringUnit,
            shops: req.body.shops,
            suppliers: req.body.suppliers
        });

        newProduct
            .save()
            .then(product => {
                res.json(product);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newProduct = new Product({
            _id: req.params.id,
            name: req.body.name,
            measuringUnit: req.body.measuringUnit,
            shops: req.body.shops,
            suppliers: req.body.suppliers
        });

        Product.findOneAndUpdate({ _id: req.params.id }, newProduct, { new: true })
            .then(product => {
                res.json(product);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Product.findOneAndDelete({ _id: req.params.id })
            .then(product => {
                res.json(product);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}