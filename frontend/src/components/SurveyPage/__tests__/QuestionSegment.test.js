import React from "react";
import { shallow } from "enzyme";
import QuestionSegment from "../QuestionSegment";

describe("QuestionSegment", () => {
  it("should match snapshot", () => {
    expect(shallow(<QuestionSegment question={{}} />)).toMatchSnapshot();
  });
});
