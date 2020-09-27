const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: "Supplier"
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    quantity: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    document: {
        type: Schema.Types.ObjectId,
        ref: "Document"
    }
});

module.exports = mongoose.model('orders', orderSchema);