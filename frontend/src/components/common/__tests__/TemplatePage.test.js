import React from "react";
import { shallow } from "enzyme";
import TemplatePage from "../TemplatePage";

describe("TemplatePage", () => {
  it("should match snapshot", () => {
    expect(shallow(<TemplatePage />)).toMatchSnapshot();
  });
});
