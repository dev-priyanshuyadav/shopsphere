import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";

describe("Navbar component", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useWishlistStore.getState().clearWishlist();
  });

  it("renders brand logo linking to home", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const logo = screen.getByRole("link", { name: /shopsphere/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("renders primary navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^shop$/i })).toBeInTheDocument();
  });

  it("displays cart count badge when items are added to cartStore", () => {
    useCartStore.getState().addItem(
      {
        id: "p1",
        title: "Wireless Headphones",
        description: "High quality sound",
        price: 99,
        category: "electronics",
        images: ["/test.jpg"],
        rating: 4.8,
        reviewCount: 120,
        stock: 15,
        brand: "Acoustic",
      },
      3,
    );

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("opens and closes mobile navigation menu", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const openMenuBtn = screen.getByRole("button", {
      name: /open mobile navigation menu/i,
    });
    fireEvent.click(openMenuBtn);

    const closeBtn = screen.getByRole("button", { name: /close menu/i });
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);
    expect(
      screen.queryByRole("button", { name: /close menu/i }),
    ).not.toBeInTheDocument();
  });
});
