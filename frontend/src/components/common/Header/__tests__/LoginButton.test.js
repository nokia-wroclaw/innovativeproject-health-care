import React from "react";
import { shallow } from "enzyme";
import LoginButton from "../LoginButton";

describe("LoginButton", () => {
  it("should match snapshot", () => {
    expect(shallow(<LoginButton />)).toMatchSnapshot();
  });
});
