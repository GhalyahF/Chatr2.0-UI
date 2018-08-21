import React, { Component } from "react";
import { observer } from "mobx-react";
import channelStore from "../../stores/channelStore";
import MessageRow from "./MessageRow";
import authStore from "../../stores/authStore";
import Profile from "../Profile/Profile";
import Welcome from "../Welcome";
class Message extends Component {
  constructor(props) {
    super(props);
    this.inputText = React.createRef();
  }

  sendMessage = () => {
    const messageBody = this.inputText.current.value;
    this.inputText.current.value = "";
    channelStore.createMessage(messageBody);
  };

  handleKeyPress = event => {
    const messageBody = this.inputText.current.value;
    if (event.key === "Enter") {
      this.inputText.current.value = "";
      channelStore.createMessage(messageBody);
    }
  };

  componentDidMount() {
    channelStore.channelID = this.props.match.params.name;
    channelStore.getMessages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      channelStore.channelID = this.props.match.params.name;
      channelStore.getMessages();
    }
  }

  render() {
    const messages = channelStore.messages.map(message => (
      <MessageRow
        key={message.id}
        message={{ ...message }}
        picture="img/abdullah.png"
      />
    ));
    const count = messages.length;
    if (!authStore.currentUser) {
      return <Welcome />;
    } else if (channelStore.loadingMessage) {
      return <h1>Loading ... </h1>;
    } else {
      return (
        <React.Fragment>
          <div className="col-xl-11">
            <Profile />
          </div>
          <div className="row">
            <div className="col-xl-11">
              <div className="chat_window">
                <div className="top_menu">
                  <div className="buttons">
                    {/* <div className="button close" />
                    <div className="button minimize" />
                    <div className="button maximize" /> */}
                    <div className="px-2 mr-2 float-right badge badge-success">
                      Total Messages: {count}
                    </div>
                  </div>
                  <div className="title">Chat</div>
                </div>
                <ul className="messages">{messages}</ul>
                <div className="bottom_wrapper clearfix">
                  <div className="message_input_wrapper">
                    <input
                      className="message_input"
                      type="text"
                      placeholder="Write your message here .."
                      ref={this.inputText}
                      onKeyPress={this.handleKeyPress}
                    />
                  </div>
                  <div className="send_message">
                    <div className="icon" />
                    <div onClick={this.sendMessage} className="text">
                      Send
                    </div>
                  </div>
                </div>
              </div>
              <div className="message_template">
                <li className="message">
                  <div className="avatar" />
                  <div className="text_wrapper">
                    <div className="text" />
                  </div>
                </li>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default observer(Message);
