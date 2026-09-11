import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App baseline test", () => {
  it("renders ShopSphere title and setup confirmation", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /shopsphere/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/phase 1 — setup complete/i)).toBeInTheDocument();
  });
});
