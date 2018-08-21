import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

// Components
import NavBar from "./components/Navigation/NavBar";
import AuthModals from "./components/Modals/AuthModals";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import SuperSecretPage from "./components/SuperSecretPage";
import Message from "./components/Message/Message";
import landingPage from "./components/LandingPage";

class App extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <AuthModals />
        <Switch>
          <Route path="/welcome" component={(Welcome, landingPage)} />
          <Route path="/channels/:name" component={Message} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
