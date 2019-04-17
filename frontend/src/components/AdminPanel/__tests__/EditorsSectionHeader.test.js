import React from "react";
import { shallow } from "enzyme";
import { EditorsSectionHeader } from "../EditorsSectionHeader";

describe("EditorsSectionHeader", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<EditorsSectionHeader />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it("should have initial state", () => {
    const wrapper = shallow(<EditorsSectionHeader />);
    const initialState = {
      showInput: false,
      inputValue: "",
      dataList: [],
      addButtonDisadbed: true,
      userId: ""
    };
    expect(wrapper.state()).toEqual(initialState);
  });
});
