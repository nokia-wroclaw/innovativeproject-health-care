import React from "react";
import { shallow } from "enzyme";
import Question from "../Question";

describe("Question", () => {
  it("should match snapshot", () => {
    expect(shallow(<Question question={{}} />)).toMatchSnapshot();
  });
});
