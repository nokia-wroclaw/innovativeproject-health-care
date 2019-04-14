import React from "react";
import { shallow } from "enzyme";
import EditorsSection from "../EditorsSection";

describe("EditorsSection", () => {
  it("should match snapshot", () => {
    expect(shallow(<EditorsSection />)).toMatchSnapshot();
  });
});
