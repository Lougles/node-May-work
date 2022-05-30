const {
  schema,
  joiName,
  joiEmail,
  joiFavorite,
  joiPhone
} = require('../middlewares/validation');
const {User} = require('../db/userModel')

const getUsers = async (req, res) => {
  const result = await User.find({});
    res.json({
    status: 'success',
    data: result,
  })
}

const getUserbyId = async (req, res) => {
  const {id} = req.params;
  const user = await User.findById(id);
  if(!user) {
    return res.status(404).json({
      status: `Fail, id: ${id} is not exist.`
    });
  }
  res.json({
    status: "success",
    data: user
  })
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
  const {name, email, phone, favorite} = await schema.validateAsync(req.body);
  const user = new User({name, email, phone, favorite});
  await user.save();
  res.json({
    status: "success"
  });
}

const updateAllfields = async (req, res) => {
  const {id} = req.params;
  const {name, email, phone, favorite} = await schema.validateAsync(req.body);
  const result = await User.findByIdAndUpdate(id, { $set: {name, email, phone, favorite}});
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
  }
  res.json({
    status: "Success",
    data: result,
  })
}

const updateFavorite = async (req, res) => {
  const {id} = req.params;
  const {favorite} = await joiFavorite.validateAsync(req.body);
  const result = await User.findByIdAndUpdate(id,{ $set: {favorite}});
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
  }
  res.json({
    status: "Success",
    data: result,
  })
}

const updatePhone = async (req, res) => {
  const {id} = req.params;
  const {phone} = await joiPhone.validateAsync(req.body);
  const result = await User.findByIdAndUpdate(id,{ $set: {phone}});
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
  }
  res.json({
    status: "Success",
    data: result,
  })
}

const updateEmail = async (req, res) => {
  const {id} = req.params;
  const {email} = await joiEmail.validateAsync(req.body);
  const result = await User.findByIdAndUpdate(id,{ $set: {email}});
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
  }
  res.json({
    status: "Success",
    data: result,
  })
}

const updateName = async (req, res) => {
  const {id} = req.params;
  const {name} = await joiName.validateAsync(req.body);
  const result = await User.findByIdAndUpdate(id,{ $set: {name}});
  if (!result){
    res.status(400).json({
      status: "Bad request"
    });
  }
  res.json({
    status: "Success",
    data: result,
  })
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