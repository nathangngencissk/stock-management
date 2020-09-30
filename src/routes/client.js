const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client')();

router.get('/', clientController.getAll);
router.post('/add', clientController.add);
router.put('/edit/:id', clientController.edit);
router.delete('/delete/:id', clientController.delete);

module.exports = router;

// curl -H "Content-Type: application/json" -d '{"cep": "1231234", "state": "PR", "city": "Curitina", "district": "Centro", "street": "seila", "number": 2}' -X PUT http://localhost:9000/api/client/edit/5f7151068a41230020767001