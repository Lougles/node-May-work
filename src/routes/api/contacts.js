const express = require('express');
const router = new express.Router();
const {
  getUsersController,
  getUserbyIdController, 
  deleteUserController, 
  postUserController, 
  updateAllfieldsController,
  updateFavoriteController,  
  updatePhoneController, 
  updateEmailController, 
  updateNameController
} = require('../../controllers/contactsController')
const {asyncWrapper} = require('../../helpers/trycatchHelper');
const {
  addUserValidation, 
  updateNameValidation, 
  updateEmailValidation, 
  updatePhoneValidation, 
  updateFavoriteValidation
} = require('../../middlewares/validation')
const {authMiddleware} = require('../../middlewares/authMiddleware');


router.use(authMiddleware);
router.get('/', asyncWrapper(getUsersController));
router.get(`/:id`, asyncWrapper(getUserbyIdController));
router.post('/', addUserValidation, asyncWrapper(postUserController));
router.put('/name/:id', updateNameValidation, asyncWrapper(updateNameController ));
router.put('/email/:id', updateEmailValidation, asyncWrapper(updateEmailController));
router.put('/phone/:id', updatePhoneValidation, asyncWrapper(updatePhoneController));
router.put('/favorite/:id', updateFavoriteValidation, asyncWrapper(updateFavoriteController));
router.patch('/:id', addUserValidation, asyncWrapper(updateAllfieldsController));
router.delete(`/:id`, asyncWrapper(deleteUserController));


module.exports = router