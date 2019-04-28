import React from "react";
import { shallow } from "enzyme";
import { AddTribePopup } from "../AddTribePopup";

describe("AddTribePopup", () => {
  const wrapper = shallow(<AddTribePopup />);

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
