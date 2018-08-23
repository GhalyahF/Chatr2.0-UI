import React, { Component } from "react";
import { observer } from "mobx-react";

// Stores
import authStore from "../../stores/authStore";

class RegistationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "female",
      selectedFile: null
    };
  }
  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    console.log(this.state.selectedFile);
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    console.log(authStore.errors);
    return (
      <div>
        <form>
          {authStore.errors.length > 0 && (
            <div className="alert alert-danger" role="alert">
              {authStore.errors}
            </div>
          )}
          <div className="form-group">
            {/* AVATAR UPLOAD*/}
            <input
              className="form-control"
              type="file"
              placeholder="Avatar"
              onChange={this.fileChangedHandler}
            />{" "}
            <button
              className="mx-auto mt-3 btn btn-small btn-link"
              onClick={this.uploadHandler}
            >
              Upload Avatar
            </button>
          </div>
          <div className="form-group">
            <select>
              <option value="Male ">Male</option>
              <option selected value="Female">
                Female
              </option>
            </select>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              required
              onChange={e => {
                authStore.username = e.target.value;
                authStore.errors = [];
              }}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              required
              onChange={e => {
                authStore.password = e.target.value;
                authStore.errors = [];
              }}
            />
          </div>
        </form>
        <div className="text-center">
          <button
            className="mx-auto mt-3 btn btn-small btn-link"
            data-dismiss="modal"
            data-toggle="modal"
            data-target={this.props.target}
            onClick={() => (authStore.errors = [])}
          >
            {this.props.alternateLinkText}
          </button>
        </div>
      </div>
    );
  }
}

export default observer(RegistationForm);
