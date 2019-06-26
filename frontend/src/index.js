import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import App from "./App";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
// import "semantic-ui-css/semantic.min.css";
import "font-awesome/css/font-awesome.min.css";
import './semantic/dist/semantic.min.css';

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL} history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
