const {schema, joiName, joiEmail, joiPhone, joiFavorite} = require('../middlewares/validation');
const { ObjectID } = require('bson');


const getUsers = async (req, res, next) => {
  try{
    const result = await req.db.Users.find({}).toArray();
     res.json({
      status: 'success',
      data: result,
    })
  } catch (err) {
    res.status(500).json({message: "Some mistake", err});
  }
}

const getUserbyId = async (req, res, next) => {
  try {
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.findOne({_id: id}, {
      name: 1,
      email: 1,
      phone: 1,
    });
    if(result){
      res.json({
        status: "success",
        data: result
      })
    }else{
      res.status(404).json({
        status: "Not Found"
      });
    }
  } catch (err) {
    res.json({
      status: 'Fail',
      message: err.message
    })
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.remove({_id: id})
    if(result){
      res.json({
        status: "success",
        data: result,
      })
    }else {
      res.status(404).json({
        status: "Not Found"
      });
    }
  } catch (err) {
    res.json({
      status: 'fail',
      error: error.message,
    })
  }
}

const postUser = async (req, res, next) => {
  try {
    const data = await schema.validateAsync(req.body);
    const result = await req.db.Users.insertOne(data);
    if(result){
      res.json({
       status: 'success',
       data: result
     })
    }else {
      res.json({
        status: "Fail",
      })
    }
  } catch (err) {
    res.json({
      status: "Fail",
      error: err.message
    });
  }
}

const updateAllfields = async (req, res, next) => {
  try {
    const id = new ObjectID(req.params.contactId);
    const {name, email, phone, favorite} = await schema.validateAsync(req.body);
    const result = await req.db.Users
    .findOneAndUpdate({_id: id}, { $set: {name, email, phone, favorite}});
    if (result){
      res.json({
        status: "Success",
        data: result,
      })
    }else {
      res.sendStatus(304);
    }
  } catch (err) {
    res.json({
      status: 'Fail',
      error: err.message,
    })
  }
}

const updateFavorite = async (req, res, next) => {
  try {
    const {favorite} = await joiFavorite.validateAsync(req.body);
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.
    findOneAndUpdate({_id: id},{ $set: {favorite}});
    if (result) {
      res.json({
        status: "Success",
        data: result,
      })
    }else {
      res.sendStatus(304);
    }
  } catch (err) {
    res.json({
      status: 'Fail',
      error: err.message
    })
  }
}

const updatePhone = async (req, res, next) => {
  try {
    const {phone} = await joiPhone.validateAsync(req.body);
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.findOneAndUpdate({_id: id},{ $set: {phone}});
    if (result) {
      res.json({
        status: "Success",
        data: result,
      })
    }else {
      res.sendStatus(304);
    }
  } catch (err) {
    res.json({
      status: 'Fail',
      error: err.message
    })
  }
}

const updateEmail = async (req, res, next) => {
  try {
    const {email} = await joiEmail.validateAsync(req.body);
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.findOneAndUpdate({_id: id},{ $set: {email}});
    if (result) {
      res.json({
        status: "Success",
        data: result,
      })
    }else {
      res.sendStatus(304);
    }
  } catch (err) {
    res.json({
      status: 'Fail',
      error: err.message
    })
  }
}

const updateName = async (req, res, next) => {
  try {
    const {name} = await joiName.validateAsync(req.body);
    const id = new ObjectID(req.params.contactId);
    const result = await req.db.Users.findOneAndUpdate({_id: id},{ $set: {name}});
    if (result) {
      res.json({
        status: "Success",
        data: result,
      })
    }else {
      res.sendStatus(304);
    }
  } catch (err) {
    res.json({
      status: 'Fail',
      error: err.message
    })
  }
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