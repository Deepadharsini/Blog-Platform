import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from '../App';

test('renders the role selection page as the root content', () => {
  render(<App />);
  expect(screen.getByText(/Select Your Role/i)).toBeInTheDocument();
});
