import React, { useState } from "react";
import { Dialog } from "@mui/material";
import Register from "./Register";
import Login from "./Login";

const switchValue = {
  login: {
    view: "login",
    heading: "Login",
  },
  signup: {
    view: "signup",
    heading: "Signup",
  },
};

const LoginDialog = ({ openDialog, setOpenDialog, DialogClose }) => {
  const [accout, setAccount] = useState(switchValue.login);

  const switchAccount = () => {
    setAccount(switchValue.signup);
  };

  const switchSignIn = () => {
    setAccount(switchValue.login);
  };

  const HandleClose = () => {
    setOpenDialog(false);
  };
  const handleTogetherClose = () => {
    DialogClose();
    HandleClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleTogetherClose}>
      {accout.view === "login" ? (
        <Login
          HandleClose={HandleClose}
          accout={accout}
          switchAccount={switchAccount}
        />
      ) : (
        <Register
          switchSignIn={switchSignIn}
          HandleClose={HandleClose}
          accout={accout}
        />
      )}
    </Dialog>
  );
};

export default LoginDialog;
