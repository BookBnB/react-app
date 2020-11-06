import React from 'react';
import { render } from '@testing-library/react';
import Login from "./Login";

test('renders learn react link', () => {
  const { getByText } = render(<Login />);
  const login = getByText(/login/i);
  expect(login).toBeInTheDocument();
});
