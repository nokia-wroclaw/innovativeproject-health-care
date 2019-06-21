import React, { useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setUserFromSessionStorage } from "./store/actions/user";
import { isUser, isManager, isEditor, isAdmin } from "./services/auth";
import routes from "./static/routeURLs";
import HomePage from "./components/HomePage";
import SurveyPage from "./components/SurveyPage";
import TribesManagementPage from "./components/TribesManagementPage";
import AdminPanelPage from "./components/AdminPanelPage";
import StatisticsPage from "./components/StatisticsPage";
import ResultsMatrixPage from "./components/ResultsMatrixPage";
import CommentsPage from "./components/CommentsPage";
import EditSurveyPage from "./components/EditSurveyPage";
import ProtectedRoute from "./components/common/ProtectedRoute/index";

const App = ({ user, ...props }) => {
  useLayoutEffect(() => {
    props.setUserFromSessionStorage();
  }, []);
  return (
    <React.Fragment>
      {user ? (
        <Switch>
          <ProtectedRoute
            path={routes.adminPanel}
            component={AdminPanelPage}
            isAuthenticated={isAdmin(user)}
          />
          <ProtectedRoute
            path={routes.tribesManagement}
            component={TribesManagementPage}
            isAuthenticated={isEditor(user) || isAdmin(user)}
          />
          <ProtectedRoute
            path={routes.resultsMatrix}
            component={ResultsMatrixPage}
            isAuthenticated={isUser(user) || isManager(user) || isEditor(user)}
          />
          <ProtectedRoute
            path={routes.fillSurvey}
            component={SurveyPage}
            isAuthenticated={isUser(user)}
          />
          <ProtectedRoute
            path={routes.statistics}
            component={StatisticsPage}
            isAuthenticated={isUser(user) || isManager(user) || isEditor(user)}
          />
          <ProtectedRoute
            path={routes.comments}
            component={CommentsPage}
            isAuthenticated={isManager(user)}
          />
          <ProtectedRoute
            path={routes.editSurvey}
            component={EditSurveyPage}
            isAuthenticated={isEditor(user)}
          />
          <Route path={routes.homePage} component={HomePage} />
        </Switch>
      ) : (
        <Route path={routes.homePage} component={HomePage} />
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
