const dataInitializer = require('./DataInitializer');
const db = require('../DataBase');

db.init();

console.log('Update Data');
dataInitializer.updateData(function(err) {
  if (err) {
      console.log(err);
  }
  else {
      console.log('Data Updated!')
  }
});

// node src/db/seed/dbUpdater.js
