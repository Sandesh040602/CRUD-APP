const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact'); // requiring the contact.js which is our database
const Conact = require('./models/contact');
const app = express();
// we are temporary storing the contact list here
var contactlist = [
    {
        name:'SANDESH',
        phone: '1234'
    },
    {
        name:'DARSHAN PADU',
        phone: '69'
    },
    {
        name:'chotu sabse bada padu',
        phone: "43321"
    }
]
// setting up the view engin as here we are using 'ejs'
app.set('view engine', 'ejs');
//setting up from which folder it should search for engine templates
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));// this middleware will access all the static files like css and js for our template engine
app.use(express.urlencoded({
    extended: true
  }));// this will encode string to object value// merging the present directory with our views name 
// setting up the middle ware so be able to parse the code
app.use(function(req,res,next){
    console.log(req.body);
    next();
});
// if we got this links in the host then it will show us that
app.get('/', function(req, res){
    Contact.find({},function(err,contact){
        if(err){
            console.log('their is an error',err); return;
        }
        return res.render('home',{
        title:'hitlist',
        contact_lis: contact
    });
    })
    
})
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"let us play with ejs"
    });
});
app.get('/delete-contact/',function(req,res){
        let id = req.query.id; // quering my id

        // finding the contact in the database using id and deleting it
        Contact.findByIdAndDelete(id,function(err){
            if(err){console.log(err,'<-error'); return;}
            return res.redirect('back');
        });
});
// when we are posting our data from the "form" we are getting it here n then
app.post('/contact-list',function(req,res){
    // console.log(req.body);
    // contactlist.push(req.body);

   Contact.create({
       name: req.body.name,
       phone: req.body.phonenos
   }, function(err,newContact){
       if(err){console.log('error in creating a contact!'); return;}
       console.log('********',newContact);
       return res.redirect('back');
   })// we are now at the same page which we were on currently
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My  is running on Port', port);
})