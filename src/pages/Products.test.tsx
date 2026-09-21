import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Products } from './Products';
import { productService } from '../services/productService';

describe('Products page', () => {
  beforeEach(async () => {
    localStorage.clear();
    await productService.resetDefaultProducts();
  });

  it('renders loading skeletons then displays products grid', async () => {
    render(
      <MemoryRouter initialEntries={['/shop']}>
        <Products />
      </MemoryRouter>
    );

    // Initial loading skeletons should be visible
    expect(screen.getByTestId('products-loading-grid')).toBeInTheDocument();

    // After async resolution, the products grid should appear
    await waitFor(() => {
      expect(screen.getByTestId('products-grid')).toBeInTheDocument();
    });

    expect(screen.getByText(/Aura Wireless Noise-Cancelling Headphones/i)).toBeInTheDocument();
  });

  it('filters by category query param', async () => {
    render(
      <MemoryRouter initialEntries={['/shop?category=electronics']}>
        <Products />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('products-grid')).toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { name: /electronics collection/i })).toBeInTheDocument();
  });

  it('shows empty state when search finds no results', async () => {
    render(
      <MemoryRouter initialEntries={['/shop?search=nonexistentproductxyz123']}>
        <Products />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no products found/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /clear all filters/i })).toBeInTheDocument();
  });

  it('allows sorting products', async () => {
    render(
      <MemoryRouter initialEntries={['/shop']}>
        <Products />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('products-grid')).toBeInTheDocument();
    });

    const sortSelect = screen.getByLabelText(/sort:/i);
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });
    expect((sortSelect as HTMLSelectElement).value).toBe('price-asc');
  });
});
