const Warehouse = require('../models/Warehouse')

module.exports = () => {
    const controller = {};
    
    controller.getAll = (req, res) => {
        Warehouse.find()
            .then(warehouses => {
                res.status(200).json(warehouses);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newWarehouse = new Warehouse({
            locale: req.body.locale,
            owner: req.body.owner,
            matrix: req.body.matrix
        });

        newWarehouse
            .save()
            .then(warehouse => {
                res.json(warehouse);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newWarehouse = new Warehouse({
            _id: req.params.id,
            locale: req.body.locale,
            owner: req.body.owner,
            matrix: req.body.matrix
        });

        Warehouse.findOneAndUpdate({ _id: req.params.id }, newWarehouse, { new: true })
            .then(warehouse => {
                res.json(warehouse);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Warehouse.findOneAndDelete({ _id: req.params.id })
            .then(warehouse => {
                res.json(warehouse);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}