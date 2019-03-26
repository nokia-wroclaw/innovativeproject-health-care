import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

import { setUser } from "./store/actions/index";
import HomePage from "./components/HomePage/";
import SurveyPage from "./components/SurveyPage/";
import UsersManagementPage from "./components/UsersManagementPage/";

class App extends Component {
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("jwt");
      const { user } = jwtDecode(jwt);
      this.props.setUser(user);
    } catch {}
  }

  render() {
    return (
      <Switch>
        <Route path="/users_management" component={UsersManagementPage} />
        <Route path="/survey" component={SurveyPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    );
  }
}

export default connect(
  null,
  { setUser }
)(App);
