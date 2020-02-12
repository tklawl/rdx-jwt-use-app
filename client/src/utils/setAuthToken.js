//Used to set/delete the Authorization header for the axios requests
//depending on if user is logged in/not 

import axios from "axios";

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token; //Apply auth token to every request if the user is logged in
    } else {
        delete axios.defaults.headers.common["Authorization"]; //Delete the auth header otherwise
    }
};

export default setAuthToken;