// const {upload} = require('../services/authService');

const uploadController = async (req,res) => {
  console.log(req.uploadMiddleware);
  res.json({
    status: "success",
  })
}
module.exports = {
  uploadController,
}