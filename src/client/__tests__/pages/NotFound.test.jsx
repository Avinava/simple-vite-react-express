import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFound from '../../pages/NotFound';

describe('NotFound page', () => {
  it('explains the problem and links back home', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back home/i })).toHaveAttribute('href', '/');
  });
});
