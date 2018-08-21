// import React from "react";
import { decorate, observable } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

class ChannelStore {
  constructor() {
    this.channels = [];
    this.loading = true;
    this.messages = [];
    this.channelID = null;
    this.loadingMessage = true;
    this.getAllChannels();
  }

  updateChannelID(channelID) {
    this.channelID = channelID;
  }

  getAllChannels() {
    return instance
      .get("channels/")
      .then(response => response.data)
      .then(channels => {
        this.channels = channels;
        this.loading = false;
      })
      .catch(err => console.log(err));
  }

  createChannel(channelName) {
    const data = {
      name: channelName
    };
    return instance.post("channels/create/", data).then(res => {
      this.channels.push(res.data);
    });
  }

  getMessages() {
    instance
      .get(`channels/${this.channelID}/`)
      .then(response => response.data)
      .then(messages => {
        this.messages = messages;
        this.loadingMessage = false;
      })
      .catch(err => console.log(err));
  }

  getLatestMessages(timestamp) {
    instance
      .get(`channels/${this.channelID}/?latest=${timestamp}`)
      .then(response => response.data)
      .then(messages => {
        this.messages.push(messages);
        this.loadingMessage = false;
      })
      .catch(err => console.log(err));
  }

  createMessage(messageBody) {
    const data = {
      message: messageBody
    };
    return instance.post(`channels/${this.channelID}/send/`, data).then(() => {
      const timeNow = Date.now();
      console.log("time is: " + timeNow);
      // this.getLatestMessages(timeNow);
      this.getMessages();
    });
  }
}

decorate(ChannelStore, {
  channels: observable,
  messages: observable,
  loading: observable,
  loadingMessage: observable,
  channelID: observable
});

export default new ChannelStore();
