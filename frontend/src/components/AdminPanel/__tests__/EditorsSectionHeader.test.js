import React from "react";
import { shallow } from "enzyme";
import { EditorsSectionHeader } from "../EditorsSectionHeader";

describe("EditorsSectionHeader", () => {
  const wrapper = shallow(<EditorsSectionHeader />);

  it("should render without crashing", () => {
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it("should have initial state", () => {
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
