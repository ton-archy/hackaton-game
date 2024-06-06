const UserModel = require('../models/User');

class UsersRepository {
  getUserByAccount (account) {
    return UserModel.where().findOne({account}).exec();
  }

  getUserByToken (hash) {
    return UserModel.findOne({hash}).exec();
  }

  getUser (id) {
    return UserModel.findOne({_id: id}).exec();
  }

  async updateHash(account, hash) {
    await UserModel.updateOne({account}, {hash});
  }

  addUser(userData) {
    const newUser = new UserModel(userData);
    newUser.save();
  }
}

module.exports = new UsersRepository();
