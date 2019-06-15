const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/Item-model');
const path = require('path');

const app = express();


app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname,'views'));


//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: false
}));
//support parsing of application/json type post data
app.use(bodyParser.json());

// connect to mongoDb
mongooes.connect("mongodb://localhost:27017/docker_node_mongo", {
        useNewUrlParser: true
    })
    .then(() => console.log("\nDatabase Connected.!"))
    .catch(err => console.log(err));



// ro ute - controllers
app.use('/hello' , function(req , res) {
    res.json({message: 'Hello world'})
})

app.get('/', function (req, res) {
    Item.find()
        .then(items => res.render('index', {
            username: "John Smith",
            items: items
        }))
        .catch(err => res.status(404).json({
            msg: 'NO item found.!'
        }));
});


app.post('/item/add', function (req, res) {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(res.redirect('/'))
});


const port = 4000;

app.listen(port, () => console.log(`\nServer is Running on Port ${port}`))