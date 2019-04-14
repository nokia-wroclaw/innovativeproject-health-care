import React from "react";
import { shallow } from "enzyme";
import Survey from "../Survey";

describe("Survey", () => {
  it("should match snapshot", () => {
    expect(shallow(<Survey />)).toMatchSnapshot();
  });
});
