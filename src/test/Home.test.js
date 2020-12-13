import {shallow} from "enzyme";
import React from "react";
import Home from "../home/Home";

it("renders home tabs", () => {
    const wrapper = shallow(<Home expired={false}/>);
    expect(wrapper.find("#scrollable-force-tab-0").prop("label")).toEqual("Registro administradores");
    expect(wrapper.find("#scrollable-force-tab-1").prop("label")).toEqual("Usuarios");
    expect(wrapper.find("#scrollable-force-tab-2").prop("label")).toEqual("Publicaciones");
    expect(wrapper.find("#scrollable-force-tab-3").prop("label")).toEqual("Servicios");
    expect(wrapper.find("#scrollable-force-tab-4").prop("label")).toEqual("Métricas");
});