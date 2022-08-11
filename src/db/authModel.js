const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: gravatar.url(this.email),
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

authSchema.pre('save', async function() {
  if (this.isNew){
    this.password =  await bcrypt.hash(this.password, 10);
  } 
})

const Auth = mongoose.model('Auth', authSchema);

module.exports = {
  Auth
}