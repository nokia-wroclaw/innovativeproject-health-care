import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setUserFromSessionStorage } from "./store/actions/user";
import { isUser, isManager, isEditor, isAdmin } from "./services/authorization";
import HomePage from "./components/HomePage";
import SurveyPage from "./components/SurveyPage";
import TribesManagementPage from "./components/TribesManagementPage";
import AdminPanel from "./components/AdminPanel";
import StatisticsPage from "./components/StatisticsPage";
import ResultsMatrixPage from "./components/ResultsMatrixPage";
import ActionItemsPage from "./components/ActionItemsPage";
import CommentsPage from "./components/CommentsPage";
import EditSurveyPage from "./components/EditSurveyPage";
import ProtectedRoute from "./components/common/ProtectedRoute/index";
import PageNotFound from "./components/PageNotFound/index";

const App = ({ user, ...props }) => {
  useEffect(() => {
    props.setUserFromSessionStorage();
  }, []);

  return (
    <React.Fragment>
      {user ? (
        <Switch>
          <ProtectedRoute
            path="/admin_panel"
            component={AdminPanel}
            isAuthenticated={isAdmin(user)}
          />
          <ProtectedRoute
            path="/tribes_management"
            component={TribesManagementPage}
            isAuthenticated={isEditor(user) || isAdmin(user)}
          />
          <ProtectedRoute
            path="/tribe_overview"
            component={ResultsMatrixPage}
            isAuthenticated={isUser(user) || isManager(user) || isEditor(user)}
          />
          <ProtectedRoute
            path="/fill_survey"
            component={SurveyPage}
            isAuthenticated={isUser(user)}
          />
          <ProtectedRoute
            path="/statistics"
            component={StatisticsPage}
            isAuthenticated={isUser(user) || isManager(user) || isEditor(user)}
          />
          <ProtectedRoute
            path="/action_items"
            component={ActionItemsPage}
            isAuthenticated={isUser(user)}
          />
          <ProtectedRoute
            path="/users_comments"
            component={CommentsPage}
            isAuthenticated={isManager(user)}
          />
          <ProtectedRoute
            path="/edit_survey"
            component={EditSurveyPage}
            isAuthenticated={isEditor(user)}
          />
          <Route path="/pageNotFound" component={PageNotFound} />
          <Route path="/" component={HomePage} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/pageNotFound" component={PageNotFound} />
          <Route path="/" component={HomePage} />
        </Switch>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.user.userData
});

export default connect(
  mapStateToProps,
  { setUserFromSessionStorage }
)(App);
