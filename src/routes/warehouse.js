const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse')();

router.get('/', warehouseController.getAll);
router.post('/add', warehouseController.add);
router.put('/edit/:id', warehouseController.edit);
router.delete('/delete/:id', warehouseController.delete);
router.post('/create_movement', warehouseController.createMovement);

module.exports = router;
