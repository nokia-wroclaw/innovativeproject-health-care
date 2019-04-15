import React from "react";
import { shallow } from "enzyme";
import SectionIcon from "../SectionIcon";

describe("SectionIcon", () => {
  it("should match snapshot", () => {
    expect(shallow(<SectionIcon />)).toMatchSnapshot();
  });

  it("should call a function on click", () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<SectionIcon onClick={mockFn} />);
    wrapper.simulate("click");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
