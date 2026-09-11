import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";

describe("Footer component", () => {
  it("renders trust badges correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByText(/free shipping/i)).toBeInTheDocument();
    expect(screen.getByText(/secure checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/easy 30-day returns/i)).toBeInTheDocument();
    expect(screen.getByText(/dedicated support/i)).toBeInTheDocument();
  });

  it("handles newsletter subscription submission", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const subscribeBtn = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(emailInput, { target: { value: "learner@example.com" } });
    fireEvent.click(subscribeBtn);

    expect(screen.getByText(/thank you for subscribing!/i)).toBeInTheDocument();
  });
});
