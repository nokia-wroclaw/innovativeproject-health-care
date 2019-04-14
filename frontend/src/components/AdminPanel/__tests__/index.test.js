import React from "react";
import { shallow } from "enzyme";
import AdminPanel from "../";

describe("AdminPanel", () => {
  it("should match snapshot", () => {
    expect(shallow(<AdminPanel />)).toMatchSnapshot();
  });
});
