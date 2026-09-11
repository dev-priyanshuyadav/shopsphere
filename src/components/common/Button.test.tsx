import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders button text correctly", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("triggers onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders loading spinner and disables button when isLoading is true", () => {
    const handleClick = vi.fn();
    render(
      <Button isLoading loadingText="Saving..." onClick={handleClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: /saving\.\.\./i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies danger variant classes correctly", () => {
    render(<Button variant="danger">Delete Item</Button>);
    const button = screen.getByRole("button", { name: /delete item/i });
    expect(button.className).toContain("bg-rose-600");
  });
});
