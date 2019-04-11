import React from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import "./style.css";

const TemplatePage = props => {
  return (
    <div className="template-page-container">
      <Header history={props.history} />
      <div className="template-page-content">{props.children}</div>
      <Footer />
    </div>
  );
};

export default TemplatePage;
