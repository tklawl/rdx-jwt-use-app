// Pull in dependencies
const Validator = require("validator"); //Module that contains some functions to help us validate form information easily
const isEmpty = require("is-empty"); //Another module that helps us determine if certain data is empty

//Export the function
module.exports = function validateRegisterInput(data) {
    let errors = {}; //Create the errors object

    //Transform all empty fields to empty strings -- validator functions only work on strings... we don't want "    " to be passed to our validator functions
    data.name = !isEmpty(data.name) ? data.name : ""; //Ternary operators act just like if statements - if isEmpty(data.name) is false, data.name is set to "" so that our validator functions can play around with it 
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 25 })) {
        errors.password = "Password must be at least 6 characters and cannot be longer than 25 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    //Return the errors object with an isValid boolean that checks if any errors exist
    return {
        errors,
        isValid: isEmpty(errors) //If there are any errors, return False (i.e. NOT valid)
    };

};