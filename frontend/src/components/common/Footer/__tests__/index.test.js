import React from "react";
import { shallow } from "enzyme";
import Footer from "../";

describe("Footer", () => {
  it("should match snapshot", () => {
    expect(shallow(<Footer />)).toMatchSnapshot();
  });
});
