import React from 'react';
import Login from "./login/Login";
import {mount, shallow} from "enzyme";

it("renders login items", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("input").length).toEqual(2);
    expect(wrapper.find("button").length).toEqual(1);
});

it("empty mail and empty password must return empty mail error message", () => {
    const wrapper = shallow(<Login />);
    wrapper.find("button").simulate("click");
    expect(wrapper.find("#error-message").text()).toEqual('El mail no puede estar vacío');
});

it("empty password and not empty mail must return empty password error message", () => {
    const wrapper = mount(<Login />);
    const mail = wrapper.find("#mail");
    mail.simulate('change', { target: { value: 'test@test.com' } });
    wrapper.find("button").simulate("click");
    expect(wrapper.find("#error-message").text()).toEqual('La contraseña no puede estar vacía');
});

it("not empty password and not empty mail must return empty error message", () => {
    const wrapper = mount(<Login />);
    const mail = wrapper.find("#mail");
    const password = wrapper.find("#password");
    mail.simulate('change', { target: { value: 'test@test.com' } });
    password.simulate('change', { target: { value: 'password' } });
    wrapper.find("button").simulate("click");
    expect(wrapper.find("#error-message").text()).toEqual('');
});