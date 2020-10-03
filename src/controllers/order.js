const Order = require('../models/Order')

module.exports = () => {
    const controller = {};

    controller.getAll = (req, res) => {
        Order.find()
            .then(orders => {
                res.status(200).json(orders);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newOrder = new Order({
            product: req.body.product,
            supplier: req.body.supplier,
            shop: req.body.shop,
            client: req.body.client,
            value: req.body.value,
            date: req.body.date,
            document: req.body.document
        });

        newOrder
            .save()
            .then(order => {
                res.json(order);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newOrder = new Order({
            _id: req.params.id,
            product: req.body.product,
            supplier: req.body.supplier,
            shop: req.body.shop,
            client: req.body.client,
            value: req.body.value,
            date: req.body.date,
            document: req.body.document
        });

        Order.findOneAndUpdate({ _id: req.params.id }, newOrder, { new: true })
            .then(order => {
                res.json(order);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Order.findOneAndDelete({ _id: req.params.id })
            .then(order => {
                res.json(order);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}