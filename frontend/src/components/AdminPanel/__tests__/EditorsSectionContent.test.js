import React from "react";
import { shallow } from "enzyme";
import EditorsSectionContent from "../EditorsSectionContent";

describe("EditorsSectionContent", () => {
  it("should match snapshot", () => {
    expect(shallow(<EditorsSectionContent />)).toMatchSnapshot();
  });
});
