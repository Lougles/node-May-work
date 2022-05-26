const express = require('express');
const router = express.Router();
const {getUsers, getUserbyId, deleteUser, postUser, updateAllfields,updateFavorite,  updatePhone, updateEmail, updateName} = require('../../controllers/usersController')
const modelsMiddleware = require("../../middlewares/models");

// const { result } = require('lodash');

router.use(modelsMiddleware);
router.get('/', getUsers);
router.get(`/:contactId`, getUserbyId);
router.delete(`/:contactId`, deleteUser);
router.post('/', postUser);
router.patch('/:contactId', updateAllfields);
router.put('/favorite/:contactId', updateFavorite);
router.put('/phone/:contactId', updatePhone);
router.put('/email/:contactId', updateEmail);
router.put('/name/:contactId', updateName);


module.exports = router