const Document = require('../models/Document')

module.exports = () => {
    const controller = {};
    
    controller.getAll = (req, res) => {
        Document.find()
            .then(documents => {
                res.status(200).json(documents);
            })
            .catch(error => res.status(500).json(error));
        
    }

    controller.add = (req, res) => {
        const newDocument = new Document({
            order: req.body.order,
            type: req.body.type,
            value: req.body.value, 
            date: req.body.date
        });

        newDocument
            .save()
            .then(document => {
                res.json(document);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newDocument = new Document({
            _id: req.params.id,
            order: req.body.order,
            type: req.body.type,
            value: req.body.value, 
            date: req.body.date
        });

        Document.findOneAndUpdate({ _id: req.params.id }, newDocument, { new: true })
            .then(document => {
                res.json(document);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Document.findOneAndDelete({ _id: req.params.id })
            .then(document => {
                res.json(document);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}