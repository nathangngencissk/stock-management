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
        let products = [];

        let productsInStock = await StockProduct.find({ shop: req.params.id })

        productsInStock.forEach(productInStock => {
            products.push({
                warehouseId: productInStock.warehouse,
                products: productInStock.product
            });
        })

        const groups = productsInStock.reduce((groups, item) => {
            const group = (groups[item.warehouse] || []);
            group.push({
                product: item.product,
                quantity: item.quantity,
                totalValue: item.totalValue,
                averageCost: item.totalValue / item.quantity
            });
            groups[item.warehouse] = group;
            return groups;
        }, {});

        console.log(groups)




        // let product = await Product.find({ _id: order.product });

        // let warehouse = await Warehouse.find({ _id: order.warehouse });

        // let isOwner = warehouse.owner == shop.owner;

        // let document = await Document.find({ _id: order.document });

        // if (product._id in products) {
        //     products[product._id] = {
        //         productName: product.name,
        //         value: document.type in ['NOTA_FISCAL_ENTRADA'] ? products[product._id].value + order.value : products[product._id].value - order.value,
        //         quantity: products[product._id].quantity + order.quantity
        //     }
        // } else {
        //     products[product._id] = {
        //         productName: product.name,
        //         value: order.value,
        //         quantity: order.quantity
        //     }
        // }

        // add to warehouse -> filter products by warehouse then push 

        // if (isOwner) {
        //     //remove values to orderProduct
        // }



        res.json(groups);
        // get all orders from shop

        // loop through orders if de saida - else +

        // 
    }

    return controller;
}