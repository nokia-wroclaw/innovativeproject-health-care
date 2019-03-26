import React from "react";
import { Button, Popup } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import colors from "../../styles/colors";

const LoginButton = props => {
  return (
    <Popup
      trigger={
        <Button
          content="Login"
          inverted
          color={colors.headerLoginButton}
          floated="right"
        />
      }
      content={<LoginForm history={props.history} />}
      on="click"
      position="bottom right"
    />
  );
};

export default LoginButton;
