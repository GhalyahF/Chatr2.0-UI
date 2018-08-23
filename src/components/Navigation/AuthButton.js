import React, { Component } from "react";
import { observer } from "mobx-react";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

//components
// import Profile from "../Profile/Profile";
// Stores
import authStore from "../../stores/authStore";

class AuthButton extends Component {
  render() {
    let buttons;

    if (authStore.isLoggedIn) {
      buttons = (
        <React.Fragment>
          <li className="nav-item">
            <a className="nav-link">
              <span className="circle bg-success circle-lg text-left" />
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link">
              <span className="navbar-link"> {authStore.currentUser}</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="modal"
              data-target="#logoutModal"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />Logout
            </a>
          </li>
        </React.Fragment>
      );
    } else {
      buttons = [
        <li key="loginButton" className="nav-item">
          <a className="nav-link" data-toggle="modal" data-target="#loginModal">
            <FontAwesomeIcon icon={faSignInAlt} />Login
          </a>
        </li>,
        <li key="signupButton" className="nav-item">
          <a
            className="nav-link"
            data-toggle="modal"
            data-target="#signupModal"
          >
            <FontAwesomeIcon icon={faUserPlus} />Signup
          </a>
        </li>
      ];
    }

    return (
      <ul className="navbar-nav ml-auto">
        {/* <span className="navbar-text">{authStore.currentUser}</span> */}
        {buttons}
      </ul>
    );
  }
}

export default observer(AuthButton);
