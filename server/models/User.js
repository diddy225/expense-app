
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleID: String,
  profileImageURL: String,
  expenses: [{
    business: String,
    amount: Number,
    due: Number,
    entry: {type: Date, default: Date.now},
    paid: {type: Boolean,default: false}
  }]
});

const User = mongoose.model("user", userSchema);

module.exports = User;