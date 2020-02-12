import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
            <nav className="z-depth-0" style={{ background: "none" }}>
              <div style={{ background: "none" }} className="nav-wrapper">
                <Link
                  to="/"
                  style={{
                    fontFamily: "monospace"
                  }}
                  className="col s5 brand-logo center black-text"
                >
                  <i className="material-icons">code</i>
                  MERN
                </Link>
              </div>
            </nav>
          </div>
        );
    }
}

export default Navbar;
