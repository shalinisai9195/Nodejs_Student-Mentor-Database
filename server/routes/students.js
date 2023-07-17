const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.homepage);
router.get('/add', studentController.addnewstudent);
router.post('/add',studentController.poststudent);

router.get('/view/:id', studentController.view);

router.get('/edit/:id', studentController.edit);
router.put('/edit/:id', studentController.editPost);

router.delete('/edit/:id', studentController.deleteStudent);

router.post('/search', studentController.searchStudent);




module.exports = router;