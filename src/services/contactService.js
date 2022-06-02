const {Contact} = require('../db/contactsModel');
const {WrongIdError} = require('../helpers/errors')

const getUsers = async (owner) => {
  const result = await Contact.find({owner});
  return result;
};

const getUserById = async (id) => {
  const result = await Contact.findById(id);
  if(!result) {
    throw new WrongIdError(`Fail, id: ${id} is not exist.`);
  }
  return result;
};

const addUser = async ({name, email, phone, favorite}, owner) => {
  const result = new Contact({name, email, phone, favorite, owner});
  await result.save();
  return result;
};

const updateName = async (id, {name}) => {
  const result = await Contact.findByIdAndUpdate(id,{ $set: {name}});
  if (!result){
    throw new WrongIdError(`Fail, id: ${id} is not exist.`);
  }
  return result;
};

const updateEmail = async (id, {email}) => {
  const result = await Contact.findByIdAndUpdate(id,{ $set: {email}});
  if (!result){
    throw new WrongIdError(`Fail, id: ${id} is not exist.`);
  }
  return result;
};

const updatePhone = async (id, {phone}) => {
  const result = await Contact.findByIdAndUpdate(id,{ $set: {phone}});
  if (!result){
    throw new WrongIdError(`Fail, id: ${id} is not exist.`);
  }
  return result;
};

const updateFavorite = async (id, {favorite}) => {
  const result = await Contact.findByIdAndUpdate(id,{ $set: {favorite}});
  if (!result){
    throw new WrongIdError(`Fail, id: ${id} is not exist.`);
  }
  return result;
};

const updateAllFields = async (id, {name, email, phone, favorite}) => {
  const result = await Contact.findByIdAndUpdate(id, { $set: {name, email, phone, favorite}});
  if (!result){
    throw new WrongIdError(`Fail, id: ${id} is not exist.`);
  }
  return result;
};

const deleteUserById = async (id) => {
  const result = await Contact.findByIdAndRemove(id);
  if (!result){
    throw new WrongIdError(`Fail, id: ${id} is not exist.`);
  }
  return result;
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateName,
  updateEmail,
  updatePhone,
  updateFavorite,
  updateAllFields,
  deleteUserById
}