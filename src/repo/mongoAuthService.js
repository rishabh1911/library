const debug = require('debug')('app:mongoAuthService');
const { MongoClient } = require('mongodb');
const mongoConstants = require('../constants/mongoConstants');

const addUser = {
  async mAddUser(user) {
    let client;
    try {
      client = await MongoClient.connect(mongoConstants.mongoUrl, { useNewUrlParser: true });
      debug('Connected to mongoDB');
      const db = client.db(mongoConstants.dbName);
      const mongoResponse = await db.collection(mongoConstants.authCollectionName)
        .insertOne(user);
      const userResponse = mongoResponse.ops[0];
      return userResponse;
    } catch (err) {
      debug(err);
    }
  }
};

const findUser = {
  async mFindUserByUserName(user) {
    let client;
    try {
      client = await MongoClient.connect(mongoConstants.mongoUrl, { useNewUrlParser: true });
      debug('Connected to mongoDB');
      const db = client.db(mongoConstants.dbName);
      debug(user);
      const returnedUser = await db.collection(mongoConstants.authCollectionName)
        .findOne(user);
      debug(returnedUser);
      return returnedUser;
    } catch (err) {
      debug(err.stack);
    }
  }
};

const addAdmin = {
  async mAddAdminUser() {
    const admin = {
      username: 'admin',
      password: 'admin'
    };
    return addUser.mAddUser(admin);
  }
};

module.exports = {
  findUser,
  addUser,
  addAdmin
};
