import React from "react";
import { shallow } from "enzyme";
import MobileMenu from "../MobileMenu";

describe("MobileMenu", () => {
  it("should match snapshot", () => {
    expect(shallow(<MobileMenu />)).toMatchSnapshot();
  });
});
