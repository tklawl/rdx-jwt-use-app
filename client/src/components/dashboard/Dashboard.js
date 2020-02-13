//Dashboard is a protected route!

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../actions/authActions";
import axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: "test"
      },
      users: []
    };
  }

  componentDidMount() {
    //Gets ALL users
    axios.get(`http://localhost:5000/api/users/getUsers`).then(res => {
      const users = res.data;
      this.setState({ users });
      console.log(users);
    });

    //Gets a specific user
    axios
      .get(`http://localhost:5000/api/users/getUser/${this.props.auth.user.id}`)
      .then(res => {
        const user = res.data.data;
        this.setState({ user });
      });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {this.props.auth.user.name}{" "}
              {this.state.user.email} {this.state.user._id}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
