import React from "react";
import Map from "./map";
import { mount, shallow } from "@enzyme";

describe("Map", () => {
  it(
    "create a Map",
    async () => {
      let handleDataLoading: any;
      await new Promise(resolve => {
        handleDataLoading = jasmine.createSpy("handleDataLoading", () =>
          resolve()
        );
        const wrapper = mount(
          <Map
            accessToken="pk.eyJ1IjoicmxtY25lYXJ5MiIsImEiOiJjajgyZjJuMDAyajJrMndzNmJqZDFucTIzIn0.BYE_k7mYhhVCdLckWeTg0g"
            onIdle={handleDataLoading}
          />
        );
        expect(wrapper).toBeTruthy();
      });

      expect(handleDataLoading).toHaveBeenCalledTimes(1);
    },
    jasmine.DEFAULT_TIMEOUT_INTERVAL * 4
  );

  it("create a Map as a span", () => {
    const wrapper = shallow(<Map accessToken="" as="span" />);
    expect(wrapper).toBeTruthy();
    expect(wrapper).toHaveTagName("span");
  });
});
