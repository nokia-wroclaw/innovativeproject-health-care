import React from "react";
import { shallow } from "enzyme";
import ColoredCheckbox from "../ColoredCheckbox";

describe("ColoredCheckbox", () => {
  it("should match snapshot", () => {
    expect(shallow(<ColoredCheckbox />)).toMatchSnapshot();
  });
});
