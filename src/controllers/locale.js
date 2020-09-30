const Locale = require('../models/Locale')

module.exports = () => {
    const controller = {};
    
    controller.getAll = (req, res) => {
        Locale.find()
            .then(locales => {
                res.status(200).json(locales);
            })
            .catch(error => res.status(500).json(error));
        
    }

    controller.add = (req, res) => {
        const newLocale = new Locale({
            adress: req.body.adress,
            warehouses: req.body.warehouses
        });

        newLocale
            .save()
            .then(locale => {
                res.json(locale);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newLocale = new Locale({
            _id: req.params.id,
            adress: req.body.adress,
            warehouses: req.body.warehouses
        });

        Locale.findOneAndUpdate({ _id: req.params.id }, newLocale, { new: true })
            .then(locale => {
                res.json(locale);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Locale.findOneAndDelete({ _id: req.params.id })
            .then(locale => {
                res.json(locale);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}