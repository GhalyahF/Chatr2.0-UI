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

  getMessagesfromAPI(channelID) {
    instance
      .get(`channels/${channelID}/`)
      .then(response => response.data)
      .then(messages => {
        this.messages = messages;
        this.loadingMessage = false;
      })
      .catch(err => console.log(err));
  }
  getLatestMessagefromAPI(channelID, timestamp) {
    instance
      .get(`channels/${channelID}/?latest=${timestamp}`)
      .then(response => response.data)
      .then(messages => {
        this.messages.push(messages);
      })
      .catch(err => console.log(err));
  }

  getMessages() {
    this.getMessagesfromAPI(this.channelID);
    return this.messages;
  }

  createMessage(messageBody, channelID) {
    const data = {
      message: messageBody
    };
    return instance.post(`channels/${channelID}/send/`, data).then(() => {
      const timeNow = Date.now();
      this.getLatestMessagefromAPI(channelID, timeNow);
    });
  }
}

decorate(ChannelStore, {
  channels: observable,
  messages: observable,
  loading: observable,
  channelID: observable
});

export default new ChannelStore();
