import React, { Component } from "react";
import { observer } from "mobx-react";
import channelStore from "../../stores/channelStore";
import MessageRow from "./MessageRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
class Message extends Component {
  constructor(props) {
    super(props);
    this.inputText = React.createRef();
  }

  sendMessage = () => {
    const messageBody = this.inputText.current.value;
    channelStore.createMessage(messageBody, this.props.match.params.name);
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  componentWillMount() {
    channelStore.channelID = this.props.match.params.name;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      channelStore.channelID = this.props.match.params.name;
    }
  }

  render() {
    const messageList = channelStore.getMessages();
    const messages = messageList.map(message => (
      <MessageRow
        key={message.id}
        message={{ ...message }}
        picture="img/abdullah.png"
      />
    ));

    if (channelStore.loadingMessage) {
      return <h1>Loading ... </h1>;
    } else {
      return (
        <div className="col-xl-8">
          <div className="card card-default">
            <div className="card-header">
              <div className="px-2 float-right badge badge-danger">5</div>
              <div className="px-2 mr-2 float-right badge badge-success">
                12
              </div>
              <div className="card-title">Team messages</div>
            </div>
            <div className="list-group" data-height="180" data-scrollable="">
              {messages}
              <div className="card-footer">
                <div className="input-group">
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Write your message here .."
                    ref={this.inputText}
                    onKeyPress={this.handleKeyPress}
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-secondary btn-sm" type="submit">
                      <FontAwesomeIcon
                        icon={faSearch}
                        onClick={this.sendMessage}
                      />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default observer(Message);
