import React from 'react';
import { render } from '@testing-library/react';
import Login from "./login/Login";

test('renders learn react link', () => {
  const { getByText } = render(<Login />);
  const login = getByText(/ingresar/i);
  expect(login).toBeInTheDocument();
});
