import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import Joi from "joi";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
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

    //call backend
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
          label={Boolean(errors.username) ? errors.username : null}
          error={Boolean(errors.username)}
        />
        <Form.Input
          name="password"
          value={account.password}
          placeholder="password"
          onChange={this.handleChange}
          type="password"
          label={Boolean(errors.password) ? errors.password : null}
          error={Boolean(errors.password)}
        />
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
