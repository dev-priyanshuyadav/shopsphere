import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../../types/product';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';

const mockProduct: Product = {
  id: 'prod-test-1',
  title: 'Wireless Studio Headphones',
  description: 'Premium acoustic sound with active noise reduction.',
  price: 199.99,
  originalPrice: 249.99,
  category: 'electronics',
  images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
  rating: 4.8,
  reviewCount: 150,
  stock: 12,
  brand: 'SoundWave',
  featured: true,
};

describe('ProductCard component', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useWishlistStore.getState().clearWishlist();
  });

  it('renders product information correctly', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('Wireless Studio Headphones')).toBeInTheDocument();
    expect(screen.getByText('SoundWave')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('$199.99')).toBeInTheDocument();
    expect(screen.getByText('$249.99')).toBeInTheDocument();
    expect(screen.getByText('-20%')).toBeInTheDocument();
  });

  it('adds product to cart when Add button is clicked', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const addBtn = screen.getByRole('button', { name: /add wireless studio headphones to cart/i });
    fireEvent.click(addBtn);

    const items = useCartStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].product.id).toBe('prod-test-1');
    expect(items[0].quantity).toBe(1);
  });

  it('toggles product in wishlist when heart button is clicked', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const wishlistBtn = screen.getByRole('button', {
      name: /add wireless studio headphones to wishlist/i,
    });
    fireEvent.click(wishlistBtn);

    expect(useWishlistStore.getState().isWishlisted('prod-test-1')).toBe(true);

    fireEvent.click(wishlistBtn);
    expect(useWishlistStore.getState().isWishlisted('prod-test-1')).toBe(false);
  });

  it('handles out of stock products gracefully', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(
      <MemoryRouter>
        <ProductCard product={outOfStockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
    const addBtn = screen.getByRole('button', { name: /add wireless studio headphones to cart/i });
    expect(addBtn).toBeDisabled();
  });
});
