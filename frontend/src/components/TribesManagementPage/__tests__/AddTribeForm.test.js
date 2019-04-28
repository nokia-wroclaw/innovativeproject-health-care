import React from "react";
import { shallow } from "enzyme";
import { AddTribeForm } from "../AddTribeForm";

describe("AddTribeForm", () => {
  const wrapper = shallow(<AddTribeForm />);

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
