const express = require('express');
const router = express.Router();
const {getUsers, getUserbyId, deleteUser, postUser, updateAllfields,updateFavorite,  updatePhone, updateEmail, updateName} = require('../../controllers/usersController')
const {asyncWrapper} = require('../../helpers/trycatchHelper');


router.get('/', asyncWrapper(getUsers));
router.get(`/:id`, asyncWrapper(getUserbyId));
router.delete(`/:id`, asyncWrapper(deleteUser));
router.post('/', asyncWrapper(postUser));
router.patch('/:id', asyncWrapper(updateAllfields));
router.put('/favorite/:id', asyncWrapper(updateFavorite));
router.put('/phone/:id', asyncWrapper(updatePhone));
router.put('/email/:id', asyncWrapper(updateEmail));
router.put('/name/:id', asyncWrapper(updateName));


module.exports = router