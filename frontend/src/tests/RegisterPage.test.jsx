import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('RegisterPage Component', () => {
  const renderWithProviders = (ui) => {
    return render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    );
  };

  it('renders the main registration form elements', () => {
    renderWithProviders(<RegisterPage />);
    expect(screen.getByRole('heading', { name: /Register/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('renders the interest selector section', () => {
    renderWithProviders(<RegisterPage />);
    expect(screen.getByText('Select Interests:')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument(); // Check for a sample interest
  });
}); 