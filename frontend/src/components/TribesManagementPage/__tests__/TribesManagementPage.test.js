import React from "react";
import { shallow } from "enzyme";
import { TribesManagementPage } from "../TribesManagementPage";

const mockTribes = [{ id: 1, name: "tribe1" }, { id: 2, name: "tribe2" }];

describe("TribesManagementPage", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<TribesManagementPage tribes={mockTribes} />);
    expect(wrapper).toMatchSnapshot();
  });
});
