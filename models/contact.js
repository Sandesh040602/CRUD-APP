const mongoose = require('mongoose');
const conactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type:String, required:true
    }
});

const Contact = mongoose.model('Contact',conactSchema);
module.exports = Contact;
console.log('we are the best');