const express = require('express');
const router = express.Router();
const stockProductController = require('../controllers/stockProduct')();

router.get('/', stockProductController.getAll);
router.post('/add', stockProductController.add);
router.put('/edit/:id', stockProductController.edit);
router.delete('/delete/:id', stockProductController.delete);

module.exports = router;
