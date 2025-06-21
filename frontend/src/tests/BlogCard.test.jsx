import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

describe('BlogCard Component', () => {
  const mockBlog = {
    _id: '123',
    title: 'My Test Blog Post',
    content: '<p>This is a test.</p>',
    author: { name: 'Test Author' },
    category: 'Technology',
    tags: ['testing', 'react'],
    views: 100,
  };

  it('renders the blog title', () => {
    render(
      <Router>
        <BlogCard blog={mockBlog} />
      </Router>
    );
    expect(screen.getByText('My Test Blog Post')).toBeInTheDocument();
  });

  it('renders author name and view count', () => {
    render(
      <Router>
        <BlogCard blog={mockBlog} />
      </Router>
    );
    expect(screen.getByText(/By Test Author/i)).toBeInTheDocument();
    expect(screen.getByText(/100 views/i)).toBeInTheDocument();
  });
}); 