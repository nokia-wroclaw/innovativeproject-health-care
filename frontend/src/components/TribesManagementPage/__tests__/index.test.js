import React from "react";
import { shallow } from "enzyme";
import { TribesManagementPage } from "../";

const mockTribes = [{ id: 1, name: "tribe1" }, { id: 2, name: "tribe2" }];

describe("TribesManagementPage", () => {
  const wrapper = shallow(<TribesManagementPage tribes={mockTribes} />);

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
