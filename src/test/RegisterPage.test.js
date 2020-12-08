import React from 'react';
import {shallow} from "enzyme";
import RegisterPage from "../register/RegisterPage";

it("renders register items", () => {

    const wrapper = shallow(<RegisterPage expired={false}/>);

    expect(wrapper.find("#name").length).toEqual(1);
    expect(wrapper.find("#surname").length).toEqual(1);
    expect(wrapper.find("#mail").length).toEqual(1);
    expect(wrapper.find("#city").length).toEqual(1);
    expect(wrapper.find("#phone").length).toEqual(1);
    expect(wrapper.find("#register-button").length).toEqual(1);
});

it("empty name must return error message", () => {
    const wrapper = shallow(<RegisterPage expired={false}/>);
    wrapper.find("#register-button").simulate("click");
    expect(wrapper.find("#name").prop("error")).toEqual(true);
    expect(wrapper.find("#name").prop("helperText")).toEqual("El nombre es un campo obligatorio");
});

it("empty surname must return error message", () => {
    const wrapper = shallow(<RegisterPage expired={false}/>);
    wrapper.find("#register-button").simulate("click");
    expect(wrapper.find("#surname").prop("error")).toEqual(true);
    expect(wrapper.find("#surname").prop("helperText")).toEqual("El apellido es un campo obligatorio");
});

it("empty mail must return error message", () => {
    const wrapper = shallow(<RegisterPage expired={false}/>);
    wrapper.find("#register-button").simulate("click");
    expect(wrapper.find("#mail").prop("error")).toEqual(true);
    expect(wrapper.find("#mail").prop("helperText")).toEqual("El mail es un campo obligatorio");
});

//TODO: arreglar este test
/*it("phone made by letters must return error message", () => {
    const wrapper = shallow(<RegisterPage expired={false}/>);
    const phone = wrapper.find("#phone");
    phone.simulate('change', { target: { value: 'phone' } });
    wrapper.find("#register-button").simulate("click");
    expect(phone.prop("error")).toEqual(true);
    expect(phone.prop("helperText")).toEqual("El telefono solo puede contener numeros");
});*/

it("not empty mandatory fields must return empty error message", () => {
    const wrapper = shallow(<RegisterPage expired={false}/>);
    const name = wrapper.find("#name");
    const surname = wrapper.find("#surname");
    const mail = wrapper.find("#mail");
    name.simulate('change', { target: { value: 'testName' } });
    surname.simulate('change', { target: { value: 'testSurname' } });
    mail.simulate('change', { target: { value: 'testMail@test.com' } });
    wrapper.find("#register-button").simulate("click");
    expect(name.prop("error")).toEqual(false);
    expect(surname.prop("error")).toEqual(false);
    expect(mail.prop("error")).toEqual(false);
    expect(wrapper.find("#phone").prop("error")).toEqual(false);
});