import React from "react";
import { shallow } from "enzyme";
import Header from "../";

describe("Header", () => {
  it("should match snapshot", () => {
    expect(shallow(<Header />)).toMatchSnapshot();
  });
});
