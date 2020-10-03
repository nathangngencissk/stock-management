const StockProduct = require('../models/StockProduct')

module.exports = () => {
    const controller = {};

    controller.getAll = (req, res) => {
        StockProduct.find()
            .then(products => {
                res.status(200).json(products);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newStockProduct = new StockProduct({
            product: req.body.product,
            warehouse: req.body.warehouse,
            shop: req.body.shop,
            quantity: req.body.quantity,
            totalValue: req.body.totalValue
        });

        newStockProduct
            .save()
            .then(product => {
                res.json(product);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newStockProduct = new StockProduct({
            _id: req.params.id,
            product: req.body.product,
            warehouse: req.body.warehouse,
            shop: req.body.shop,
            quantity: req.body.quantity,
            totalValue: req.body.totalValue
        });

        StockProduct.findOneAndUpdate({ _id: req.params.id }, newStockProduct, { new: true })
            .then(product => {
                res.json(product);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        StockProduct.findOneAndDelete({ _id: req.params.id })
            .then(product => {
                res.json(product);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}