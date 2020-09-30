const express = require('express');
const router = express.Router();
const suppliersController = require('../controllers/suppliers')();

router.get('/', suppliersController.getAll);
router.post('/add', suppliersController.add);
router.put('/edit/:id', suppliersController.edit);
router.delete('/delete/:id', suppliersController.delete);

module.exports = router;
