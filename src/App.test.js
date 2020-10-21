import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const login = getByText(/login/i);
  expect(login).toBeInTheDocument();
});
