import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
  render(<div>Hello World</div>);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
