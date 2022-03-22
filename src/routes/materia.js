const express = require('express');
const router = express.Router();

const materiaController = require('../controllers/materiaController');

router.get('/', materiaController.list);
router.post('/add', materiaController.save);
router.get('/delete/:id', materiaController.delete);
router.get('/update/:id', materiaController.edit);
router.post('/update/:id', materiaController.update);

module.exports = router;