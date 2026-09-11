import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App Routing", () => {
  it("renders Home page hero heading on default root route", () => {
    window.history.pushState({}, "Home", "/");
    render(<App />);
    expect(
      screen.getByRole("heading", {
        name: /curated quality for your daily lifestyle/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders 404 NotFound page when navigating to an invalid route", () => {
    window.history.pushState({}, "404", "/some-non-existent-page");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /page not found/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to home/i }),
    ).toBeInTheDocument();
  });
});
