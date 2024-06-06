const repository = require("../repositories/UsersRepository");

class UserService {
  getUser(account) {
    return repository.getUserByAccount(account);
  }

  getUserByHash(hash) {
    return repository.getUserByToken(hash);
  }

  async createUser(account, hash) {
    await repository.addUser({account, hash})
  }

  updateHash(account, hash) {
    repository.updateHash(account, hash);
  }
}

module.exports = new UserService();
