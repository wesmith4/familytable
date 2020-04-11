// See https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#18d5

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// I don't know exactly what this code below does
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  fullName: {type: String, required: false, unique: false}
});

UserSchema.pre('save', function(next) {
  // Check if a password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this
    const document = this;;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
        if (err) {
          next(err);
        } else {
          document.password = hashedPassword;
          next();
        }
      });
  } else {
    next();
  }
});

// Schema method to authenticate user
UserSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  })
}

module.exports = mongoose.model('User', UserSchema);
