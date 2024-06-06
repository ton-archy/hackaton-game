const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RecordMapper = require("../db/plugins/RecordMapper");

const userSchema = Schema({
  account: {type: String, required: true},
  hash: {type: String, required: false},
});

userSchema.plugin(RecordMapper);

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
