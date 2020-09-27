const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    measuringUnit: {
        type: String,
        require: true
    },
    shops: [{
        type: Schema.Types.ObjectId,
        ref: "Shop"
    }],
    suppliers: [{
        type: Schema.Types.ObjectId,
        ref: "Supplier"
    }]
});

module.exports = mongoose.model('products', productSchema);