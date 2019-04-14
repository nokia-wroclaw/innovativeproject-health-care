import React from "react";
import { shallow } from "enzyme";
import UserDisplayName from "../UserDisplayName";

describe("UserDisplayName", () => {
  it("should match snapshot", () => {
    expect(shallow(<UserDisplayName />)).toMatchSnapshot();
  });
});
