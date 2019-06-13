import React from "react";
import { Button, Popup } from "semantic-ui-react";
import LoginForm from "../LoginForm";
import * as colors from "../../../styles/colors";

const LoginButton = () => {
  return (
    <Popup
      trigger={
        <Button
          content="Log in"
          inverted
          color={colors.headerLoginButton}
          floated="right"
        />
      }
      content={<LoginForm />}
      on="click"
      position="bottom right"
    />
  );
};

export default LoginButton;
