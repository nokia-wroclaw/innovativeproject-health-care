import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/";
import SurveyPage from "./components/SurveyPage/";
import UsersManagementPage from "./components/UsersManagementPage/";

class App extends Component {
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

export default App;
