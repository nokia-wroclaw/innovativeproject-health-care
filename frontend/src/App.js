import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { setUserFromLocalStorage } from "./store/actions/user";
// import authorization from "./services/authorization";
import HomePage from "./components/HomePage";
import SurveyPage from "./components/SurveyPage";
// import UsersManagementPage from "./components/UsersManagementPage";
import TribesManagementPage from "./components/TribesManagementPage";
import AdminPanel from "./components/AdminPanel";
import StatisticsPage from "./components/StatisticsPage";
import ResultsMatrixPage from "./components/ResultsMatrixPage";
import ActionItemsPage from "./components/ActionItemsPage";
import CommentsPage from "./components/CommentsPage";
import EditSurveyPage from "./components/EditSurveyPage";

class App extends Component {
  componentDidMount() {
    this.props.setUserFromLocalStorage();
  }

  render() {
    return (
      <Switch>
        {/* 
          if authorization.isAdmin(this.props.user) <Route ...> else <Redirect ...>
        */}
        <Route path="/admin_panel" component={AdminPanel} />
        <Route path="/tribes_management" component={TribesManagementPage} />
        <Route path="/tribe_overview" component={ResultsMatrixPage} />
        <Route path="/fill_survey" component={SurveyPage} />
        <Route path="/statistics" component={StatisticsPage} />
        <Route path="/action_items" component={ActionItemsPage} />
        <Route path="/users_comments" component={CommentsPage} />
        <Route path="/edit_survey" component={EditSurveyPage} />
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
  { setUserFromLocalStorage }
)(App);
