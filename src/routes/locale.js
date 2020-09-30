const express = require('express');
const router = express.Router();
const localeController = require('../controllers/locale')();

router.get('/', localeController.getAll);
router.post('/add', localeController.add);
router.put('/edit/:id', localeController.edit);
router.delete('/delete/:id', localeController.delete);

module.exports = router;
