const {Contact} = require('../db/contactsModel');
const {WrongIdError} = require('../helpers/errors')

const getUsers = async (owner, favorite, {page}) => {
  if(!page){
    page = 1;
  }
  const limit = 5;
  const skip = parseInt(page - 1) * parseInt(limit);
  if(favorite === undefined){
    const result = await Contact.find({owner})
    .select({name: 1, email: 1, phone: 1, favorite: 1})
    .skip(skip)
    .limit(limit);
    return result;
  }
  const result = await Contact.find({owner, favorite})
  .select({name: 1, email: 1, phone: 1, favorite: 1})
  .skip(skip)
  .limit(limit);
  return result;
};

const getUserById = async (contactId, owner) => {
  const result = await Contact.findOne({_id: contactId, owner});
  if(!result) {
    throw new WrongIdError(`Fail, id: ${contactId} is not exist.`);
  }
  return result;
};

const addUser = async ({name, email, phone, favorite}, owner) => {
  const result = new Contact({name, email, phone, favorite, owner});
  await result.save();
  return result;
};

const updateName = async (contactId, {name}, owner) => {
  const result = await Contact.findOneAndUpdate({_id: contactId, owner},{ $set: {name}});
  if (!result){
    throw new WrongIdError(`Fail, id: ${contactId} is not exist.`);
  }
  return result;
};

const updateEmail = async (contactId, {email}, owner) => {
  const result = await Contact.findOneAndUpdate({_id: contactId, owner}, { $set: {email}});
  if (!result){
    throw new WrongIdError(`Fail, id: ${contactId} is not exist.`);
  }
  return result;
};

const updatePhone = async (contactId, {phone}, owner) => {
  const result = await Contact.findOneAndUpdate({_id: contactId, owner}, { $set: {phone}});
  if (!result){
    throw new WrongIdError(`Fail, id: ${contactId} is not exist.`);
  }
  return result;
};

const updateFavorite = async (contactId, {favorite}, owner) => {
  const result = await Contact.findOneAndUpdate({_id: contactId, owner}, { $set: {favorite}});
  if (!result){
    throw new WrongIdError(`Fail, id: ${contactId} is not exist.`);
  }
  return result;
};

const updateAllFields = async (contactId, {name, email, phone, favorite}, owner) => {
  const result = await Contact.findOneAndUpdate({_id: contactId, owner}, { $set: {name, email, phone, favorite}});
  if (!result){
    throw new WrongIdError(`Fail, id: ${contactId} is not exist.`);
  }
  return result;
};

const deleteUserById = async (contactId, owner) => {
  const result = await Contact.findOneAndRemove({_id: contactId, owner});
  if (!result){
    throw new WrongIdError(`Fail, id: ${contactId} is not exist.`);
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