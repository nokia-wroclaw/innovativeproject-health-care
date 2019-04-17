import React from "react";
import { shallow, mount } from "enzyme";
import { EditorsSectionContent } from "../EditorsSectionContent";

describe("EditorsSectionContent", () => {
  it("should match snapshot", () => {
    expect(
      shallow(<EditorsSectionContent editor={{ name: "John" }} />)
    ).toMatchSnapshot();
  });

  it("should have editor prop and it should be an object with 'name' field", () => {
    const wrapper = mount(<EditorsSectionContent editor={{ name: "John" }} />);
    expect(wrapper.prop("editor")).toBeInstanceOf(Object);
    expect(wrapper.prop("editor").name).toBeTruthy();
  });
});
