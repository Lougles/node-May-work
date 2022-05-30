const express = require('express');
const router = express.Router();
const {getUsersController, getUserbyIdController, deleteUserController, postUserController, updateAllfieldsController,updateFavoriteController,  updatePhoneController, updateEmailController, updateNameController} = require('../../controllers/usersController')
const {asyncWrapper} = require('../../helpers/trycatchHelper');


router.get('/', asyncWrapper(getUsersController));
router.get(`/:id`, asyncWrapper(getUserbyIdController));
router.delete(`/:id`, asyncWrapper(deleteUserController));
router.post('/', asyncWrapper(postUserController));
router.patch('/:id', asyncWrapper(updateAllfieldsController));
router.put('/favorite/:id', asyncWrapper(updateFavoriteController));
router.put('/phone/:id', asyncWrapper(updatePhoneController));
router.put('/email/:id', asyncWrapper(updateEmailController));
router.put('/name/:id', asyncWrapper(updateNameController ));


module.exports = router