const {GroupModel, UserModel} = require('./model');

class Group {
  constructor() {
    this.findGroup = async (_id) => {
      return await GroupModel.findById(_id);
    };
    this.findGroups = async (group_ids) => {
      return await GroupModel.find({_id: {$in: group_ids}});
    };
    this.findTopGroups = async (count) => {
      if (count) {
        return await GroupModel.find().sort({size: -1}).limit(count);
      } else {
        return await GroupModel.find().sort({size: -1});
      }
    };
  }
}

class User {
  constructor() {
    this.findUser = async (_id) => {
      if (!_id) {
        const user = await UserModel.find().limit(1);
        return user[0];
      } else {
        return await UserModel.findById(_id);
      }
    };
    this.findUsers = async (user_ids) => {
      return await UserModel.find({_id: {$in: user_ids}});
    }
  }
}

module.exports = { User, Group };
