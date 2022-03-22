const express = require('express');
const router = express.Router();

const estudianteController = require('../controllers/estudianteController');

router.get('/', estudianteController.list);
router.post('/add', estudianteController.save);
router.get('/delete/:id', estudianteController.delete);
router.get('/update/:id', estudianteController.edit);
router.post('/update/:id', estudianteController.update);

module.exports = router;