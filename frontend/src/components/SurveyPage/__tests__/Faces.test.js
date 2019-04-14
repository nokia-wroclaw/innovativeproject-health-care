import React from "react";
import { shallow } from "enzyme";
import Faces from "../Faces";

describe("Faces", () => {
  it("should match snapshot", () => {
    expect(shallow(<Faces />)).toMatchSnapshot();
  });
});
