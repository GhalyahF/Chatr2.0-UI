import React, { Component } from "react";
import authStore from "../stores/authStore";
import Profile from "./Profile/Profile";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    if (authStore.currentUser) {
      return (
        <div className="col-md-11">
          <Profile />
        </div>
      );
    } else {
      return (
        <header className="masthead d-flex" id="welcome-headline">
          <div className="container text-center my-auto z-1">
            <h1 className="mb-1">
              CHATR 2.0{" "}
              <Link className="navbar-brand" to="/welcome">
                <img
                  src="https://png.icons8.com/metro/50/000000/chat.png"
                  alt="chatr logo"
                />
              </Link>
            </h1>
            <h3 className="mb-5">
              <em id="welcome-mssg"> Login to see the messages. </em>
            </h3>
            <button
              className="btn btn-primary btn-lg"
              data-toggle="modal"
              data-target="#loginModal"
            >
              Login
            </button>
          </div>
          <div className="overlay z-0" />
        </header>
      );
    }
  }
}

export default observer(Welcome);
