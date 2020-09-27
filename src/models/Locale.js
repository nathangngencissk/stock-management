const mongoose = require('mongoose');
const { Schema } = mongoose;

const localeSchema = new Schema({
    addresses: [{
        type: Schema.Types.ObjectId,
        ref: "Address"
    }]
});

module.exports = mongoose.model('locales', localeSchema);