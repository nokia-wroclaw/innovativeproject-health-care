import React from "react";
import { shallow } from "enzyme";
import { EditorsSectionHeader } from "../EditorsSectionHeader";

describe("EditorsSectionHeader", () => {
  it("should match snapshot", () => {
    expect(shallow(<EditorsSectionHeader />)).toMatchSnapshot();
  });
});
