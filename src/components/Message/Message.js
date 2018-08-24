import React, { Component } from "react";
import { observer } from "mobx-react";

import JSEMOJI from "emoji-js";
import EmojiModal from "../Modals/EmojiModal";
//stores
import channelStore from "../../stores/channelStore";
import authStore from "../../stores/authStore";
//components
import MessageRow from "./MessageRow";
import Welcome from "../Welcome";

//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = "emojione";
// set the storage location for all emojis
jsemoji.img_sets.emojione.path =
  "https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojiShown: false,
      text: " "
    };
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

  //emoji handler
  handleEmojiClick = (n, e) => {
    let emoji = jsemoji.replace_colons(`:${e.name}:`);
    this.inputText.current.value = emoji;
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
          <div className="row">
            <div className="col-xl-10">
              <div className="chat_window">
                <div className="top_menu">
                  <div className="buttons">
                    <div className="px-2 mr-2 float-right badge badge-success">
                      Total Messages: {count}
                    </div>
                  </div>
                  <div>
                    <div className="title">
                      Chat{" "}
                      <div
                        className="px-2 mr-2 float-right badge badge-danger"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Emoji
                      </div>
                    </div>
                  </div>
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
                      defaultValue={this.state.text}
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
            <EmojiModal handleEmojiClick={this.handleEmojiClick} />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default observer(Message);
