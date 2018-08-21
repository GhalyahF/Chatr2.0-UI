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
        <div>
          <Welcome />
          <video id="background-video" loop autoPlay muted plays-inline>
            <source
              src="https://gcs-vimeo.akamaized.net/exp=1534861653~acl=%2A%2F429506417.mp4%2A~hmac=4dcce23aee0722f92971a44b3968bcc274a4b276ffb2d021d7fd9cc25ab8747d/vimeo-prod-skyfire-std-us/01/3586/5/142930259/429506417.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
  }
}
export default observer(landingPage);
