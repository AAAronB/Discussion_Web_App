// Import the modules we need
var express = require ('express')
var ejs = require('ejs')
var bodyParser= require ('body-parser')
var mysql = require('mysql');
const session = require('express-session');

// Create the express application object
const app = express()
const port = 8000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
  }));

// Define the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'appuser',
    password: 'app2027',
    database: 'myForum'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;


// Set up css
app.use(express.static(__dirname + '/styling'));

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views');

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);

// Define our data
var ForumData = {ForumName: "Discussion App"}

// Requires the main.js file inside the routes folder passing in the Express app and data as arguments.  All the routes will go in this file
require("./main")(app, ForumData);
// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))