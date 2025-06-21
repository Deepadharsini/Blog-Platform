import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('LoginPage Component', () => {
  const renderWithProviders = (ui) => {
    return render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    );
  };

  it('renders the reader login page by default', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText(/Reader Login/i)).toBeInTheDocument();
  });

  it('renders email and password input fields', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });
}); 