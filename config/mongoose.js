//required the library
const mongoose = require('mongoose');
//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db')

// acquire the connection and check if it was successful
const db = mongoose.connection;

//on error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log('successfully connected to the data base');
})