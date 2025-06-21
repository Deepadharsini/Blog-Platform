import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';

describe('Header Component', () => {
  it('renders the FeedFlow logo', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText('FeedFlow')).toBeInTheDocument();
  });

  it('shows Login and Register buttons when no user is logged in', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows a welcome message and profile icon for a logged-in user', () => {
    const mockUser = { name: 'Test User', profilePicture: '' };
    localStorage.setItem('user', JSON.stringify(mockUser));

    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText(/Hi, Test User/i)).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();

    localStorage.removeItem('user'); // Cleanup
  });
}); 