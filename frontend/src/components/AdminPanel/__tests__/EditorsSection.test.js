import React from "react";
import { shallow } from "enzyme";
import { EditorsSection } from "../EditorsSection";

const mockSetEditors = jest.fn();

describe("EditorsSection", () => {
  const wrapper = shallow(<EditorsSection setEditors={mockSetEditors} />);

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it("should call setEditors() in mounting phase", () => {
  //   expect(mockSetEditors).toHaveBeenCalledTimes(1);
  // });
});
