const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
const users = require("./routes/api/users");
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
//5000 is for heroku! although we aren't using that right now

app.listen(port, () => console.log(`Server up and running on port ${port}.`))