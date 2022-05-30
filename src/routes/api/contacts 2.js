const express = require('express');
const router = express.Router();
const {getUsers, getUserbyId, deleteUser, postUser, updateAllfields,updateFavorite,  updatePhone, updateEmail, updateName} = require('../../controllers/usersController')
const modelsMiddleware = require("../../middlewares/models");
const {asyncWrapper} = require('../../helpers/apiHelpers')

// const { result } = require('lodash');

router.use(modelsMiddleware);
router.get('/', asyncWrapper(getUsers));
router.get(`/:contactId`, asyncWrapper(getUserbyId));
router.delete(`/:contactId`, asyncWrapper(deleteUser));
router.post('/', asyncWrapper(postUser));
router.patch('/:contactId', asyncWrapper(updateAllfields));
router.put('/favorite/:contactId', asyncWrapper(updateFavorite));
router.put('/phone/:contactId', asyncWrapper(updatePhone));
router.put('/email/:contactId', asyncWrapper(updateEmail));
router.put('/name/:contactId', asyncWrapper(updateName));


module.exports = router