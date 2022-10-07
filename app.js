const express = require("express");
const path = require("path"); 
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const { stringify } = require("querystring");


mongoose.connect('mongodb://localhost/library', {useNewUrlParser: true});
const port = process.env.PORT || 8000;
// const port = 8000;


// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema);

// Define mongoose schema addd
var library_infoSchema = new mongoose.Schema({
    myname: String,
    myrollnumber: String,
    myemail: String,
    mydate: String,
    mynumber: String,
    myeligibility: String,
    mygender: Boolean,
    writeaboutyouself: String,
    mystateresiding: String
    // Submithere: string
  });

var library_info = mongoose.model('library_info', library_infoSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{ 
    const params = {}
    res.status(200).render('contact.pug', params);
})
//addd
app.get('/library_info', (req, res)=>{ 
    const params = {}
    res.status(200).render('library_info.pug', params);
})
//addd
app.get('/about', (req, res)=>{ 
    const params = {}
    res.status(200).render('about.pug', params);
})

app.post('/contact', (req, res)=>{ 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
})

//addd
app.post('/library_info', (req, res)=>{ 
    var myData = new library_info(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('library_info.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});