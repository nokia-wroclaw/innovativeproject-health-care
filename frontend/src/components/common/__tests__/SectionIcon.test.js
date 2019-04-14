import React from "react";
import { shallow } from "enzyme";
import SectionIcon from "../SectionIcon";

describe("SectionIcon", () => {
  it("should match snapshot", () => {
    expect(shallow(<SectionIcon />)).toMatchSnapshot();
  });
});
