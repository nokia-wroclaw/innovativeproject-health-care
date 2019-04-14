import React from "react";
import { shallow } from "enzyme";
import SurveyPage from "../";

describe("SurveyPage", () => {
  it("should match snapshot", () => {
    expect(shallow(<SurveyPage />)).toMatchSnapshot();
  });
});
