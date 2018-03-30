const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
  name: String,
  group_id: String,
  picture: String,
  fb_token: String,
  fb_id: String,
});

const GroupSchema = Mongoose.Schema({
  user_ids: [String],
  title: String,
  size: Number,
});

const UserModel = Mongoose.model('User', UserSchema);
const GroupModel = Mongoose.model('Group', GroupSchema);

module.exports = {UserModel, GroupModel};