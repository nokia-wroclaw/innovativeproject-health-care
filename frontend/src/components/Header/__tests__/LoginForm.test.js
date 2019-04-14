import React from "react";
import { shallow } from "enzyme";
import LoginForm from "../LoginForm";

describe("LoginForm", () => {
  it("should match snapshot", () => {
    expect(shallow(<LoginForm />)).toMatchSnapshot();
  });
});
