const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');

router.post('/create', validateRequest, userController.createUser);
router.get('/read/:id', validateRequest, userController.readUser);
router.put('/update/:id', validateRequest, userController.updateUser);
router.delete('/delete/:id', validateRequest, userController.deleteUser);

module.exports = router;