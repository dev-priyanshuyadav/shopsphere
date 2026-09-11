import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";

describe("Input component", () => {
  it("renders input with label and links label via htmlFor", () => {
    render(<Input label="Email Address" placeholder="you@example.com" />);
    const label = screen.getByText(/email address/i);
    const input = screen.getByPlaceholderText(/you@example.com/i);
    expect(label).toHaveAttribute("for", input.id);
  });

  it("renders error message and marks aria-invalid", () => {
    render(<Input label="Password" error="Password is required" />);
    const input = screen.getByLabelText(/password/i);
    const errorMessage = screen.getByRole("alert");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(errorMessage).toHaveTextContent(/password is required/i);
    expect(input).toHaveAttribute("aria-describedby", errorMessage.id);
  });

  it("updates input value on change", () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Search" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "Laptop" } });
    expect(handleChange).toHaveBeenCalled();
    expect((input as HTMLInputElement).value).toBe("Laptop");
  });
});
