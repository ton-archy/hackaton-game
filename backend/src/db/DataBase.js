const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const HOST = process.env.DB_HOST;
const DATABASE = process.env.DB_NAME;

class DataBase {
  constructor() {
    this.connection = null;
  }

  init() {
    console.log('Trying to connect to ' + HOST + '/' + DATABASE + ' MongoDB database');

    const connectionString = `mongodb://localhost:27017/reignarchy`;
    mongoose.connect(connectionString, options);
    this.connection = mongoose.connection;
    this.connection.on('error', console.error.bind(console, 'connection error:'));
    this.connection.once('open', function () {
      console.log('db connection open');
    });
    return this.connection;
  }

  close() {
    if (this.connection) {
      this.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    }
  }
}

module.exports = new DataBase();
