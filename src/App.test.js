/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
  // eslint-disable-next-line react/jsx-no-undef
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
