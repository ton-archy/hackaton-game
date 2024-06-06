const dataInitializer = require('./DataInitializer');
const db = require('../DataBase');

db.init();

console.log('Initializing Data');
dataInitializer.initializeData(function(err) {
  if (err) {
      console.log(err);
  }
  else {
      console.log('Data Initialized!')
  }
});

// node src/db/seed/dbSeeder.js
