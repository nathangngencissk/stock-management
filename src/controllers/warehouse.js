const Warehouse = require('../models/Warehouse')
const Document = require('../models/Document')
const Order = require('../models/Order')
const StockProduct = require('../models/StockProduct')

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

    controller.createMovement = async (req, res) => {
        let movementType = req.body.type == 'NOTA_FISCAL_ENTRADA' ? 'in' : 'out';

        // create doc
        const newDocument = new Document({
            type: req.body.type,
            description: req.body.description,
            value: req.body.value,
            quantity: req.body.quantity
        });

        let document = await newDocument.save();

        // create order
        const newOrder = new Order({
            product: req.body.product,
            supplier: req.body.supplier,
            shop: req.body.shop,
            client: req.body.client,
            warehouse: req.body.warehouse,
            document: document._id
        });

        let order = await newOrder.save();

        let stockProduct = await StockProduct.findOne({ shop: req.body.shop, warehouse: req.body.warehouse, product: req.body.product });

        // update stock information
        if (movementType == 'in') {
            if (stockProduct) {
                //update existing product
                const newStockProduct = new StockProduct({
                    _id: stockProduct._id,
                    product: req.body.product,
                    warehouse: req.body.warehouse,
                    shop: req.body.shop,
                    quantity: req.body.quantity + stockProduct.quantity,
                    totalValue: req.body.value + stockProduct.totalValue
                });

                let product = await StockProduct.findOneAndUpdate({ _id: stockProduct._id }, newStockProduct, { new: true });
            }
            else {
                //create new product
                const newStockProduct = new StockProduct({
                    product: req.body.product,
                    warehouse: req.body.warehouse,
                    shop: req.body.shop,
                    quantity: req.body.quantity,
                    totalValue: req.body.value
                });

                let product = await newStockProduct.save();
            }
        }
        else {
            if (stockProduct && stockProduct.quantity >= req.body.quantity) {
                //enough product in stock
                const newStockProduct = new StockProduct({
                    _id: stockProduct._id,
                    product: req.body.product,
                    warehouse: req.body.warehouse,
                    shop: req.body.shop,
                    quantity: stockProduct.quantity - req.body.quantity,
                    totalValue: stockProduct.totalValue - req.body.value
                });

                let product = await StockProduct.findOneAndUpdate({ _id: stockProduct._id }, newStockProduct, { new: true });
            }
            else if (stockProduct && stockProduct.quantity < req.body.quantity) {
                //not enough product
                res.status(500).json('Error: not enough product for the request.');
            }
            else {
                //no product found
                res.status(500).json('Error: no product found.');
            }
        }

        // return order
        res.json(order);
    }

    return controller;
}