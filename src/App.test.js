import React from 'react';
import Login from "./login/Login";
import {mount, shallow} from "enzyme";

it("renders login items", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("#mail").length).toEqual(1);
    expect(wrapper.find("#password").length).toEqual(1);
    expect(wrapper.find("#login-button").length).toEqual(1);
});

it("empty mail and empty password must return empty mail and empty password error messages", () => {
    const wrapper = shallow(<Login />);
    wrapper.find("#login-button").simulate("click");
    expect(wrapper.find("#mail").prop("error")).toEqual(true);
    expect(wrapper.find("#mail").prop("helperText")).toEqual("El mail no puede estar vacío");
    expect(wrapper.find("#password").prop("error")).toEqual(true);
    expect(wrapper.find("#password").prop("helperText")).toEqual("La contraseña no puede estar vacía");
});

it("empty password and not empty mail must return empty password error message", () => {
    const wrapper = shallow(<Login />);
    const mail = wrapper.find("#mail");
    mail.simulate('change', { target: { value: 'test@test.com' } });
    wrapper.find("#login-button").simulate("click");
    expect(wrapper.find("#mail").prop("error")).toEqual(false);
    expect(wrapper.find("#password").prop("error")).toEqual(true);
    expect(wrapper.find("#password").prop("helperText")).toEqual("La contraseña no puede estar vacía");
});

it("empty mail and not empty password must return empty mail error message", () => {
    const wrapper = shallow(<Login />);
    const password = wrapper.find("#password");
    password.simulate('change', { target: { value: 'password' } });
    wrapper.find("#login-button").simulate("click");
    expect(wrapper.find("#mail").prop("error")).toEqual(true);
    expect(wrapper.find("#mail").prop("helperText")).toEqual("El mail no puede estar vacío");
    expect(wrapper.find("#password").prop("error")).toEqual(false);
});

it("not empty password and not empty mail must return empty error message", () => {
    const wrapper = shallow(<Login />);
    const mail = wrapper.find("#mail");
    const password = wrapper.find("#password");
    mail.simulate('change', { target: { value: 'test@test.com' } });
    password.simulate('change', { target: { value: 'password' } });
    wrapper.find("#login-button").simulate("click");
    expect(wrapper.find("#mail").prop("error")).toEqual(false);
    expect(wrapper.find("#password").prop("error")).toEqual(false);
});