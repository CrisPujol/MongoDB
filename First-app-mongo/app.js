var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/test';
// Use connect method to connect to the Server

MongoClient.connect(url, (err, db) => {

  if (err) throw("There were problems connecting to the DB server...");

  db.collection('restaurants')
      .find( { "borough": "Manhattan" } )
      .forEach( (doc) => console.log (doc) );
      // .toArray( (err, docs) => console.log (docs) );

  // db.close();

});