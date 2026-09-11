import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./RootLayout";

describe("RootLayout", () => {
  it("renders skip to content link with #main-content target", () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>,
    );

    const skipLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("renders child routes inside the main container outlet", () => {
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="test" element={<div>Child Page Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/child page content/i)).toBeInTheDocument();
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
  });

  it("renders header and footer when provided", () => {
    render(
      <MemoryRouter>
        <RootLayout
          header={<div>Custom Header</div>}
          footer={<div>Custom Footer</div>}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(/custom header/i)).toBeInTheDocument();
    expect(screen.getByText(/custom footer/i)).toBeInTheDocument();
  });
});
