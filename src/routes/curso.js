const express = require('express');
const router = express.Router();

const cursoController = require('../controllers/cursoController');

router.get('/', cursoController.list);
router.post('/add', cursoController.save);
router.get('/delete/:id', cursoController.delete);
router.get('/update/:id', cursoController.edit);
router.post('/update/:id', cursoController.update);

module.exports = router;