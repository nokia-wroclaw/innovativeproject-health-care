import React, { Component } from "react";
import Header from "../Header";
import Survey from "./Survey";

class SurveyPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Survey />
      </React.Fragment>
    );
  }
}

export default SurveyPage;
