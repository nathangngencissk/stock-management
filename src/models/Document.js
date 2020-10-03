const mongoose = require('mongoose');
const { Schema } = mongoose;

const documentSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    },
    type: {
        type: String,
        enum: ['NOTA_FISCAL_ENTRADA',
            'NOTA_FISCAL_SAIDA',
            'SAIDA_PARA_CONSUMO_INTERNO',
            'REQUISICAO_DE_CONSUMO',
            'SAIDA_POR_DEVOLUCAO',
            'SAIDA_POR_PERDA',
            'SAIDA_POR_AJUSTE'],
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