const Shop = require('../models/Shop')
const Order = require('../models/Order')
const Product = require('../models/Product')
const Warehouse = require('../models/Warehouse')
const Document = require('../models/Document')
const StockProduct = require('../models/StockProduct')

module.exports = () => {
    const controller = {};

    controller.getAll = (req, res) => {
        Shop.find()
            .then(shops => {
                res.status(200).json(shops);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newShop = new Shop({
            address: req.body.address,
            owner: req.body.owner,
            name: req.body.name,
            products: req.body.products
        });

        newShop
            .save()
            .then(shop => {
                res.json(shop);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newShop = new Shop({
            _id: req.params.id,
            address: req.body.address,
            owner: req.body.owner,
            name: req.body.name,
            products: req.body.products
        });

        Shop.findOneAndUpdate({ _id: req.params.id }, newShop, { new: true })
            .then(shop => {
                res.json(shop);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Shop.findOneAndDelete({ _id: req.params.id })
            .then(shop => {
                res.json(shop);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.getStockInformation = async (req, res) => {
        let productsInStock = await StockProduct.find({ shop: req.params.id })
        shopProducts = {}
        for (const item of productsInStock) {

            let warehouseProducts = (shopProducts[item.warehouse] || [])

            let warehouse = await Warehouse.find({ _id: item.warehouse });
            let shop = await Shop.find({ _id: item.shop });
            let product = await Product.findOne({ _id: item.product });

            let isOwner = warehouse.owner == shop.owner

            warehouseProducts.push({
                productId: item.product,
                productName: product.name,
                productMeasuringUnit: product.measuringUnit,
                quantity: item.quantity,
                totalValue: isOwner ? item.totalValue : '',
                averageCost: isOwner ? item.totalValue / item.quantity : ''
            });

            shopProducts[item.warehouse] = warehouseProducts;

        }
        res.json(shopProducts)

        // const groups = productsInStock.reduce(async (groups, item) => {

        //     const group = (groups[item.warehouse] || []);

        //     let warehouse = await Warehouse.find({ _id: item.warehouse });
        //     let shop = await Shop.find({ _id: item.shop });
        //     let product = await Product.findOne({ _id: item.product });

        //     let isOwner = warehouse.owner == shop.owner

        //     group.push({
        //         productId: item.product,
        //         productName: product.name,
        //         productMeasuringUnit: product.measuringUnit,
        //         quantity: item.quantity,
        //         totalValue: isOwner ? item.totalValue : '',
        //         averageCost: isOwner ? item.totalValue / item.quantity : ''
        //     });

        //     groups[item.warehouse] = group;

        //     console.log(groups)

        //     return groups;
        // }, {});

        // groups.then(result => res.json(result))
    }

    return controller;
}