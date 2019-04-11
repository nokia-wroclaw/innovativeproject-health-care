import React, { Component } from "react";
import Survey from "./Survey";
import TemplatePage from "../common/TemplatePage/";

class SurveyPage extends Component {
  render() {
    return (
      <TemplatePage>
        <Survey />
      </TemplatePage>
    );
  }
}

export default SurveyPage;
