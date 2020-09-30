const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order')();

router.get('/', orderController.getAll);
router.post('/add', orderController.add);
router.put('/edit/:id', orderController.edit);
router.delete('/delete/:id', orderController.delete);

module.exports = router;
