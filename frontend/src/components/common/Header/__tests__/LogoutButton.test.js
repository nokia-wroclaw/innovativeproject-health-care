import React from "react";
import { shallow } from "enzyme";
import LogoutButton from "../LogoutButton";

describe("LogoutButton", () => {
  it("should match snapshot", () => {
    expect(shallow(<LogoutButton />)).toMatchSnapshot();
  });
});
