import React, { Component } from "react";
import authStore from "../stores/authStore";
import Profile from "./Profile/Profile";
import { observer } from "mobx-react";

class Welcome extends Component {
  render() {
    if (authStore.currentUser) {
      return <Profile />;
    } else {
      return (
        <header className="masthead d-flex">
          <div className="container text-center my-auto z-1">
            <h1 className="mb-1">WELCOME TO CHATR</h1>
            <h3 className="mb-5">
              <em>You're gonna need to login to see the messages</em>
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
