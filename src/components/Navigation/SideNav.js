import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import authStore from "../../stores/authStore";
import channelStore from "../../stores/channelStore";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
    this.inputText = React.createRef();
  }

  createChannelHandler = () => {
    const channelName = this.inputText.current.value;
    channelStore.createChannel(channelName);
    this.inputText.current.value = "";
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.createChannelHandler();
    }
  };

  addNewChannelInput = () => {
    return (
      <div className="row">
        <div className="col-lg-9 m-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text" id="btnGroupAddon">
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={this.createChannelHandler}
                />
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="New Channel ..."
              aria-label="New Channel ..."
              aria-describedby="btnGroupAddon"
              ref={this.inputText}
              onKeyPress={this.handleKeyPress}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const channelLinks = channelStore.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    if (!authStore.currentUser) {
      return <div />;
    } else {
      return (
        <div>
          <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
            >
              <Link className="nav-link heading" to="/createChannel">
                <span className="nav-link-text mr-2">Channels</span>
              </Link>
            </li>
            {this.addNewChannelInput()}
            {channelLinks}
          </ul>
          <ul className="navbar-nav sidenav-toggler">
            <li className="nav-item">
              <a
                className="nav-link text-center"
                id="sidenavToggler"
                onClick={() =>
                  this.setState(prevState => ({
                    collapsed: !prevState.collapsed
                  }))
                }
              >
                <FontAwesomeIcon
                  icon={this.state.collapsed ? faAngleRight : faAngleLeft}
                />
              </a>
            </li>
          </ul>
        </div>
      );
    }
  }
}

export default observer(SideNav);
