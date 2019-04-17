import React from "react";
import { shallow } from "enzyme";
import { EditorsSection } from "../EditorsSection";

const mockSetEditors = jest.fn();
const mockEditors = [
  { name: "editor0", id: 0 },
  { name: "editor1", id: 1 },
  { name: "editor2", id: 2 }
];

describe("EditorsSection", () => {
  const wrapper = shallow(
    <EditorsSection editors={mockEditors} setEditors={mockSetEditors} />
  );

  it("should render without crashing", () => {
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it("should call setEditors() in mounting phase", () => {
    expect(mockSetEditors).toHaveBeenCalledTimes(1);
  });

  it("should have 4 children in Card when editors prop is 3-element array", () => {
    expect(wrapper.find(".editors-section-card").children()).toHaveLength(4);
  });
});
