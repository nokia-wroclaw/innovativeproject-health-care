import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

import { setUser } from "./store/actions/auth";
import authorization from "./services/authorization";
import HomePage from "./components/HomePage/";
import SurveyPage from "./components/SurveyPage/";
import UsersManagementPage from "./components/UsersManagementPage/";
import AdminPanel from "./components/AdminPanel/";

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
        {/* 
          if authorization.isAdmin(this.props.user) <Route ...> else <Redirect ...>
        */}
        <Route path="/admin_panel" component={AdminPanel} />
        <Route path="/users_management" component={UsersManagementPage} />
        <Route path="/fill_survey" component={SurveyPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.userData
});

export default connect(
  mapStateToProps,
  { setUser }
)(App);
