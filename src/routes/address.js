const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address')();

router.get('/', addressController.getAll);
router.post('/add', addressController.add);
router.put('/edit/:id', addressController.edit);
router.delete('/delete/:id', addressController.delete);

module.exports = router;

// curl -H "Content-Type: application/json" -d '{"cep": "1231234", "state": "PR", "city": "Curitina", "district": "Centro", "street": "seila", "number": 2}' -X PUT http://localhost:9000/api/address/edit/5f7151068a41230020767001