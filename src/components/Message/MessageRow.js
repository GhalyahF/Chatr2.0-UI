import React, { Component } from "react";
import Moment from "moment";

class MessageRow extends Component {
  render() {
    const message = this.props.message;
    let picture = this.props.picture;
    const dateTime = message.timestamp;
    Moment.locale("en-gb");
    const formattedDT = Moment(dateTime).format("LL"); //20 Mart 2017

    if (message.username === "abdabbas") {
      picture = "img/abdullah.png";
    } else if (message.username === "GhalyahFA") {
      picture = "img/Ghalyah.png";
    } else {
      picture = "img/contact.png";
    }
    console.log(picture);

    return (
      <div className="list-group-item list-group-item-action">
        <div className="media">
          <img
            className="align-self-start mx-2 circle thumb32"
            src={picture}
            alt="Image1"
          />
          <div className="media-body text-truncate">
            <p className="mb-1">
              <strong className="text-primary">
                <span className="circle bg-success circle-lg text-left" />
                <span>{message.username}</span>
              </strong>
            </p>
            <p className="mb-1 text-sm">{message.message}</p>
          </div>
          <div className="ml-auto">
            <small className="text-muted ml-2">{formattedDT}</small>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageRow;
