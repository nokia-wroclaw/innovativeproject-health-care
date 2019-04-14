import React from "react";
import { shallow } from "enzyme";
import HomePage from "../";

describe("HomePage", () => {
  it("should match snapshot", () => {
    expect(shallow(<HomePage />)).toMatchSnapshot();
  });
});
