const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

//Cross origination resource sharing -- our client is hosted on 3000, but our server is hosted on 5000 -- we need to send requests between the ports
const cors = require("cors");
router.use(cors());

// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
  // Form validation - uses the register.js file from ../validation; the function returns a JSON object that we destructure
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation - if NOT valid, return a 400 error and the errors in JSON format. We will use this to show errors on our front-end
  if (!isValid) {
    return res.status(400).json(errors); //Note that the return will end the function execution here, ensuring nothing AFTER this point (in the function) is run
  }

  //Check if the user's email address exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      //If the user's email does exist...
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //If the user's email does not exist, make a newUser object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      //Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash; //Hash the password
          newUser
            .save()
            .then(user => res.json(user)) //Send back user details (with the bycrpted password)
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 31556926 }, // 1 year in seconds
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//Get ALL users
router.get("/getUsers", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(404).json({ success: false, error: `No users found` });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch(err => console.log(err));
});

//Get a specific user
router.get("/getUser/:id", (req, res) => {
  const userId = req.params.id;

  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch(err => console.log(err));
});

module.exports = router;
