import React, { Component } from "react";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
import { Button, Form } from "semantic-ui-react";
import Joi from "joi";
import colors from "../../styles/colors";
import { login } from "../../services/authService";
import { setUser } from "./../../store/actions/";

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

  handleSubmit = async e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const { username, password } = this.state.account;
    try {
      const response = await login(username, password);
      const jwt = response.data.access_token;
      localStorage.setItem("jwt", jwt);
      const { user } = jwtDecode(jwt);
      this.props.setUser(user);
      this.props.history.push("/survey");
    } catch {
      const errors = { ...this.state.errors };
      errors.loginFailed = true;
      this.setState({ errors });
    }
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
        {errors.loginFailed && (
          <p style={{ color: "red" }}>Invalid username or password</p>
        )}
        <Form.Field style={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" color={colors.formLoginButton}>
            Login
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

export default connect(
  null,
  { setUser }
)(LoginForm);
