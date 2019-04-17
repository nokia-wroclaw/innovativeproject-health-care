import React from "react";
import { shallow } from "enzyme";
import LoginModal from "../LoginModal";

describe("LoginModal", () => {
  it("should match snapshot", () => {
    expect(shallow(<LoginModal />)).toMatchSnapshot();
  });
});
