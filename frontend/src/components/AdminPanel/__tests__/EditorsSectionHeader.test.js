import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EditorsSectionHeader from "../EditorsSectionHeader";

describe("EditorsSectionHeader", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<EditorsSectionHeader />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
