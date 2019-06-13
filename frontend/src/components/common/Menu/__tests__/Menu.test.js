import React from "react";
import { shallow } from "enzyme";
import Menu from "../Menu";

describe("Menu", () => {
  it("should match snapshot", () => {
    expect(shallow(<Menu />)).toMatchSnapshot();
  });
});
