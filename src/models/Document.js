const mongoose = require('mongoose');
const { Schema } = mongoose;

const documentSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    },
    type: {
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
    }
});

module.exports = mongoose.model('documents', documentSchema);