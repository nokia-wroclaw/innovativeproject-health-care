import React from "react";
import { shallow } from "enzyme";
import AdminPanelPage from "../";

describe("AdminPanelPage", () => {
  it("should match snapshot", () => {
    expect(shallow(<AdminPanelPage />)).toMatchSnapshot();
  });
});
