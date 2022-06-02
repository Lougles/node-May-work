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
  const {name, email, phone, favorite} = req.body;
  await addUser({name, email, phone, favorite});
  res.json({
    status: "success",
  });
}

const updateNameController = async (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  await updateName(id, {name})
  res.json({
    status: "Success",
  })
}

const updateEmailController = async (req, res) => {
  const {id} = req.params;
  const {email} = req.body;
  await updateEmail(id, {email});
  res.json({
    status: "Success",
  })
}

const updatePhoneController = async (req, res) => {
  const {id} = req.params;
  const {phone} = req.body;
  await updatePhone(id, {phone});
  res.json({
    status: "Success",
  })
}

const updateFavoriteController = async (req, res) => {
  const {id} = req.params;
  const {favorite} = req.body;
  await updateFavorite(id, {favorite});
  res.json({
    status: "Success",
  })
}

const updateAllfieldsController = async (req, res) => {
  const {id} = req.params;
  const {name, email, phone, favorite} = req.body;
  await updateAllFields(id, {$set: {name, email, phone, favorite }});
  res.json({
    status: "Success",
  })
}

const deleteUserController = async (req, res) => {
  const {id} = req.params;
  await deleteUserById(id);
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
