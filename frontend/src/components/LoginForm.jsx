import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

class LoginForm extends Component {
  state = {
    login: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    console.log("submitted");
  };

  render() {
    const { login, password } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <input
            name="login"
            value={login}
            placeholder="name or e-mail"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="password"
            value={password}
            placeholder="password"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field style={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" color="green">
            login
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

export default LoginForm;
