const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/owner')();

router.get('/', ownerController.getAll);
router.post('/add', ownerController.add);
router.put('/edit/:id', ownerController.edit);
router.delete('/delete/:id', ownerController.delete);

module.exports = router;
