const {User} = require('../db/userModel')

const getUsers = async (req, res, next) => {
  const result = await User.find({});
    res.json({
    status: 'success',
    data: result,
  })
}

const getUserbyId = async (req, res) => {
  // const id = new ObjectID(req.params.contactId);
  // const result = await req.db.Users.findOne({_id: id}, {
  //   name: 1,
  //   email: 1,
  //   phone: 1,
  // });
  // if(result){
  //   res.json({
  //     status: "success",
  //     data: result
  //   })
  // }else{
  //   res.status(404).json({
  //     status: "Not Found"
  //   });
  // }
}

const deleteUser = async (req, res) => {
  // const id = new ObjectID(req.params.contactId);
  // const result = await req.db.Users.remove({_id: id})
  // if(result){
  //   res.json({
  //     status: "success",
  //     data: result,
  //   })
  // }else {
  //   res.status(404).json({
  //     status: "Not Found"
  //   });
  // }
}

const postUser = async (req, res) => {
  // const {name, email, phone, favorite} = await schema.validateAsync(req.body);
  // const result = await req.db.Users.insertOne(data);
  // if(result){
  //   res.json({
  //     status: 'success',
  //     data: result
  //   })
  // }else {
  //   res.json({
  //     status: "Fail",
  //   })
  // }
}

const updateAllfields = async (req, res) => {
  // const id = new ObjectID(req.params.contactId);
  // const {name, email, phone, favorite} = await schema.validateAsync(req.body);
  // const result = await req.db.Users
  // .findOneAndUpdate({_id: id}, { $set: {name, email, phone, favorite}});
  // if (result){
  //   res.json({
  //     status: "Success",
  //     data: result,
  //   })
  // }else {
  //   res.sendStatus(304);
  // }
}

const updateFavorite = async (req, res) => {
  // const {favorite} = await joiFavorite.validateAsync(req.body);
  // const id = new ObjectID(req.params.contactId);
  // const result = await req.db.Users.
  // findOneAndUpdate({_id: id},{ $set: {favorite}});
  // if (result) {
  //   res.json({
  //     status: "Success",
  //     data: result,
  //   })
  // }else {
  //   res.sendStatus(304);
  // }
}

const updatePhone = async (req, res) => {
  // const {phone} = await joiPhone.validateAsync(req.body);
  // const id = new ObjectID(req.params.contactId);
  // const result = await req.db.Users.findOneAndUpdate({_id: id},{ $set: {phone}});
  // if (result) {
  //   res.json({
  //     status: "Success",
  //     data: result,
  //   })
  // }else {
  //   res.sendStatus(304);
  // }
}

const updateEmail = async (req, res) => {
  // const {email} = await joiEmail.validateAsync(req.body);
  // const id = new ObjectID(req.params.contactId);
  // const result = await req.db.Users.findOneAndUpdate({_id: id},{ $set: {email}});
  // if (result) {
  //   res.json({
  //     status: "Success",
  //     data: result,
  //   })
  // }else {
  //   res.sendStatus(304);
  // }
}

const updateName = async (req, res) => {
  // const {name} = await joiName.validateAsync(req.body);
  // const id = new ObjectID(req.params.contactId);
  // const result = await req.db.Users.findOneAndUpdate({_id: id},{ $set: {name}});
  // if (result) {
  //   res.json({
  //     status: "Success",
  //     data: result,
  //   })
  // }else {
  //   res.sendStatus(304);
  // }
}




module.exports = {
  getUsers,
  getUserbyId,
  deleteUser,
  postUser,
  updateAllfields,
  updateFavorite,  
  updatePhone,
  updateEmail,
  updateName,
}