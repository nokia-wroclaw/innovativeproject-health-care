import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import Joi from "joi";
import colors from "../../styles/colors";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });

    if (!result.error) return null;
    const errors = {};
    result.error.details.map(item => (errors[item.path[0]] = item.message));
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;

    const errors = { ...this.state.errors };
    if (errors[input.name]) errors[input.name] = "";

    this.setState({ account, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const { username, password } = this.state.account;
    // var formData = new FormData();
    // formData.append("username", username);
    // formData.append("password", password);
    fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
        mode: "no-cors"
      }
      // body: formData
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.log("err: ", err));
  };

  render() {
    const { account, errors } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name="username"
          value={account.username}
          placeholder="name or e-mail"
          onChange={this.handleChange}
          error={Boolean(errors.username)}
        />
        <Form.Input
          name="password"
          value={account.password}
          placeholder="password"
          onChange={this.handleChange}
          type="password"
          error={Boolean(errors.password)}
        />
        <Form.Field style={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" color={colors.formLoginButton}>
            login
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

export default LoginForm;
