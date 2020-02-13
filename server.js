const mongoose = require("mongoose"); //Used to interact with MongoDB
const bodyParser = require("body-parser"); //Used to parse incoming request bodies
const express = require("express"); //Sits on top of Node to make routing, request handling and responding easier to write - our server framework
const passport = require("passport"); //Used to authenticate requests. Passport-jwt is a passport strategy for authenticating endpoints with a JSON Web Token
const users = require("./routes/api/users"); //Our user roues
const app = express()

//body-parser: used to parse incoming request bodies in a middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json())

//MongoDB configuration
const db = require("./config/keys").mongoURI;

//MongoDB connection
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected!"))
    .catch(err => console.log("Error with connecting to mongodb!"));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}.`))