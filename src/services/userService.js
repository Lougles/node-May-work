const {User} = require('../db/userModel')


const getUsers = async () => {
  const result = await User.find({});
  return result;
};

const getUserById = async (id) => {
  const result = await User.findById(id);
  if(!result) {
    return res.status(404).json({
      status: `Fail, id: ${id} is not exist.`
    });
  }
  return result;
};

const addUser = async ({name, email, phone, favorite}) => {
  const result = new User({name, email, phone, favorite});
  await result.save();
  return result;
};

const updateName = async (id, {name}) => {
  const result = await User.findByIdAndUpdate(id,{ $set: {name}});
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
  }
  return result;
};
const updateEmail = async (id, {email}) => {
  const result = await User.findByIdAndUpdate(id,{ $set: {email}});
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
  }
  return result;
};

const updatePhone = async (id, {phone}) => {
  const result = await User.findByIdAndUpdate(id,{ $set: {phone}});
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
  }
  return result;
};

const updateFavorite = async (id, {favorite}) => {
  const result = await User.findByIdAndUpdate(id,{ $set: {favorite}});
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
  }
  return result;
};

const updateAllFields = async (id, {name, email, phone, favorite}) => {
  const result = await User.findByIdAndUpdate(id, { $set: {name, email, phone, favorite}});
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
  }
  return result;
};

const deleteUserById = async (id) => {
  const result = await User.findByIdAndRemove(id);
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
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