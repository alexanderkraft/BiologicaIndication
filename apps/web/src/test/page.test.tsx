import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

// Import after mocks
import HomePage from '../app/page';

describe('HomePage', () => {
  it('renders the application title', () => {
    render(<HomePage />);
    expect(screen.getByText('CRSwNP')).toBeInTheDocument();
  });

  it('renders the login link', () => {
    render(<HomePage />);
    const loginLink = screen.getByText('Sign in with institutional account');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute(
      'href',
      '/api/auth/login?returnTo=/dashboard',
    );
  });

  it('renders the disclaimer', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/For healthcare professionals only/i),
    ).toBeInTheDocument();
  });

  it('does not present shortlist as recommendation', () => {
    render(<HomePage />);
    const text = document.body.textContent ?? '';
    // Must use "shortlist" not "recommendation"
    expect(text.toLowerCase()).not.toContain('recommends');
    expect(text.toLowerCase()).not.toContain('recommendation');
  });
});
