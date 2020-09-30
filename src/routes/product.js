const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')();

router.get('/', productController.getAll);
router.post('/add', productController.add);
router.put('/edit/:id', productController.edit);
router.delete('/delete/:id', productController.delete);

module.exports = router;
