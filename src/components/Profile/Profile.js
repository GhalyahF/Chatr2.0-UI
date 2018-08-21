import React, { Component } from "react";
// import RegistrationForm from "../Modals/RegistrationForm";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      selectedFile: null
    };
  }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    console.log(this.state.selectedFile);
  };

  changeStatus = () => {
    this.setState({ status: !this.state.status });
  };

  showStatus = () => {
    if (this.state.status) {
      return (
        <button
          onClick={this.changeStatus}
          className="btn btn-success btn-xs"
          type="button"
        >
          "Online"
        </button>
      );
    } else {
      return (
        <button
          onClick={this.changeStatus}
          className="btn btn-danger btn-xs"
          type="button"
        >
          "Offline"
        </button>
      );
    }
  };

  render() {
    const style = { backgroundImage: `url(img/profile-bg.jpg)` };
    return (
      <div className="col-md-12">
        <div className="card b text-white">
          <div className="card-body bg-cover clearfix" style={style}>
            <div className="media mt-0 align-items-center">
              <img
                className="mr-3 img-thumbnail rounded-circle thumb96"
                src="img/abdullah.png"
                alt="jsx-a11y/img-redundant-alt"
              />
              <div className="media-body">
                <div className="d-flex">
                  <div>
                    <h4 className="m-0">Abdullah Alrayes</h4>
                    <p>Django Developer</p>
                    {this.showStatus()}
                  </div>
                  <div className="ml-auto">
                    <div className="inline text-center mr-2">
                      <div className="h3 m-0">
                        <strong>1.4k</strong>
                      </div>
                      <small>followers</small>
                    </div>
                    <div className="inline text-center mr-2">
                      <div className="h3 m-0">
                        <strong>350</strong>
                      </div>
                      <small>pictures</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
