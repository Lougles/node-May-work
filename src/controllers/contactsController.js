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
} = require('../services/contactService');

const getUsersController = async (req, res) => {
  const {_id: owner} = req.user;
  const page = parseInt(req.query.page);
  const result = await getUsers(owner, {page});
  res.json({
    status: 'success',
    data: result,
  })
}

const getUserbyIdController = async (req, res) => {
  const {id: contactId} = req.params;
  const {_id: owner} = req.user;
  const result = await getUserById(contactId, owner);
  res.json({
    status: "success",
    data: result
  })
}

const postUserController = async (req, res) => {
  const {name, email, phone, favorite} = req.body;
  const {_id: owner} = req.user;
  await addUser({name, email, phone, favorite}, owner);
  res.json({
    status: "success",
  });
}

const updateNameController = async (req, res) => {
  const {id: contactId} = req.params;
  const {name} = req.body;
  const {_id: owner} = req.user;
  await updateName(contactId, {name}, owner)
  res.json({
    status: "Success",
  })
}

const updateEmailController = async (req, res) => {
  const {id: contactId} = req.params;
  const {email} = req.body;
  const {_id: owner} = req.user;
  await updateEmail(contactId, {email}, owner);
  res.json({
    status: "Success",
  })
}

const updatePhoneController = async (req, res) => {
  const {id: contactId} = req.params;
  const {phone} = req.body;
  const {_id: owner} = req.user;
  await updatePhone(contactId, {phone}, owner);
  res.json({
    status: "Success",
  })
}

const updateFavoriteController = async (req, res) => {
  const {id: contactId} = req.params;
  const {favorite} = req.body;
  const {_id: owner} = req.user;
  await updateFavorite(contactId, {favorite}, owner);
  res.json({
    status: "Success",
  })
}

const updateAllfieldsController = async (req, res) => {
  const {id: contactId} = req.params;
  const {_id: owner} = req.user;
  const {name, email, phone, favorite} = req.body;
  await updateAllFields(contactId, {name, email, phone, favorite }, owner);
  res.json({
    status: "Success",
  })
}

const deleteUserController = async (req, res) => {
  const {id: contactId} = req.params;
  const {_id: owner} = req.user;
  await deleteUserById(contactId, owner);
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
