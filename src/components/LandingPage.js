import React, { Component } from "react";
import { observer } from "mobx-react";
//components
import Welcome from "./Welcome";
import Profile from "./Profile/Profile";

//stores
import authStore from "../stores/authStore";

class landingPage extends Component {
  render() {
    if (authStore.currentUser) {
      return (
        <div className="col-md-11">
          <Profile />
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-lg-12">
            <Welcome />
            <video id="background-video" loop autoPlay muted plays-inline>
              <source src="/video/welcome.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      );
    }
  }
}
export default observer(landingPage);
