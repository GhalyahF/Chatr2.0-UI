import React from "react";
import EmojiPicker from "emoji-picker-react";

// components
import Message from "./Message/Message";

function StateWithEmoji(props) {
  const { text, items, handleChange, handleEmojiClick, handleSubmit } = props;

  return (
    <div className="container">
      ""
      <div className="messages">
        <Message items={items} />
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            onChange={handleChange}
            value={text}
            placeholder="Type your text..."
          />
          <button className="submit">{"Send"}</button>
        </form>
        <span id="show-emoji-yes" onClick={toggleEmojiState}>
          {"😎"}
        </span>
        <div className="emoji-table">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      </div>
    </div>
  );
}

export default StateWithEmoji;
