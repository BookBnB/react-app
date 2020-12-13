import {shallow} from "enzyme";
import React from "react";
import UsersPage from "../users/UsersPage";

it("renders users page tabs", () => {
    const wrapper = shallow(<UsersPage expired={false}/>);
    expect(wrapper.find("#scrollable-force-tab-0").prop("label")).toEqual("Listar usuarios");
    expect(wrapper.find("#scrollable-force-tab-1").prop("label")).toEqual("Listar transacciones");
});