import React from "react";

// Components
import Modal from "./Modal";
import RegistrationForm from "./RegistrationForm";

const AuthModals = () => {
  return (
    <div>
      <Modal key="signup" title="Register an account" type="signup">
        <RegistrationForm
          target="#loginModal"
          alternateLinkText="Login with an existing account"
        />
      </Modal>
      <Modal key="login" title="Login to send messages" type="login">
        <RegistrationForm
          target="#signupModal"
          alternateLinkText="Register an account"
        />
      </Modal>
      <Modal key="logout" title="Ready to Leave?" type="logout">
        Select "Logout" below if you are ready to end your current session.
      </Modal>
    </div>
  );
};

export default AuthModals;
