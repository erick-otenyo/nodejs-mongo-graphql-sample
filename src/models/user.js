var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var secret = require("../config").secret;

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true
    },
    bio: String,
    image: String,
    password: String
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.validPassword = async function(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

UserSchema.methods.setPassword = async function(password) {
  this.password = await bcrypt.hash(password, 12);
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      user: {
        id: this._id,
        username: this.username
      },
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  );
};

UserSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.toProfileJSONFor = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    image:
      this.image || "https://static.productionready.io/images/smiley-cyrus.jpg"
  };
};

module.exports = mongoose.model("User", UserSchema);
