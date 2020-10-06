const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document')();

router.get('/', documentController.getAll);
router.get('/get/:id', documentController.get);
router.post('/add', documentController.add);
router.put('/edit/:id', documentController.edit);
router.delete('/delete/:id', documentController.delete);

module.exports = router;
