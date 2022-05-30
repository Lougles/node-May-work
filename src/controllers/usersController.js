const {
  schema,
  joiName,
  joiEmail,
  joiFavorite,
  joiPhone
} = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  addUser,
  updateName,
  updateEmail,
  updatePhone,
  updateFavorite,
  updateAllFields,
  deleteUserById
} = require('../services/userService');

const getUsersController = async (req, res) => {
  const result = await getUsers();
  res.json({
    status: 'success',
    data: result,
  })
}

const getUserbyIdController = async (req, res) => {
  const {id} = req.params;
  const result = await getUserById(id);
  res.json({
    status: "success",
    data: result
  })
}

const postUserController = async (req, res) => {
  const {name, email, phone, favorite} = await schema.validateAsync(req.body);
  const result = await addUser({name, email, phone, favorite});
  res.json({
    status: "success",
  });
}

const updateNameController = async (req, res) => {
  const {id} = req.params;
  const {name} = await joiName.validateAsync(req.body);
  const result = await updateName(id, {name})
  res.json({
    status: "Success",
  })
}

const updateEmailController = async (req, res) => {
  const {id} = req.params;
  const {email} = await joiEmail.validateAsync(req.body);
  const result = await updateEmail(id, {email});
  res.json({
    status: "Success",
  })
}

const updatePhoneController = async (req, res) => {
  const {id} = req.params;
  const {phone} = await joiPhone.validateAsync(req.body);
  const result = await updatePhone(id, {phone});
  res.json({
    status: "Success",
  })
}

const updateFavoriteController = async (req, res) => {
  const {id} = req.params;
  const {favorite} = await joiFavorite.validateAsync(req.body);
  const result = await updateFavorite(id, {favorite});
  res.json({
    status: "Success",
  })
}

const updateAllfieldsController = async (req, res) => {
  const {id} = req.params;
  const {name, email, phone, favorite} = await schema.validateAsync(req.body);
  const result = await updateAllFields(id, {$set: {name, email, phone, favorite }});
  res.json({
    status: "Success",
  })
}

const deleteUserController = async (req, res) => {
  const {id} = req.params;
  const result = await deleteUserById(id);
  res.json({
    status: "Success",
  })
}

module.exports = {
  getUsersController,
  getUserbyIdController,
  deleteUserController,
  postUserController,
  updateAllfieldsController,
  updateFavoriteController,  
  updatePhoneController,
  updateEmailController,
  updateNameController,
}