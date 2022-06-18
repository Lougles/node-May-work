const {upload} = require('../services/authService');

const uploadController = async (req,res) => {
  res.json({
    status: "success",
  })
}
module.exports = {
  uploadController,
}