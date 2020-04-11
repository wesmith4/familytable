const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// I don't know exactly what this code below does
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
});

UserSchema.pre('save', function(next) {
  // Check if a password has been set

})

module.exports = mongoose.model('User', UserSchema);
