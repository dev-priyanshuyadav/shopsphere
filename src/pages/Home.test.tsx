import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";

describe("Home featured products", () => {
  it("links each of the first four featured products to its details page", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const hero = screen.getByRole("heading", {
      name: /curated quality for your daily lifestyle/i,
    }).closest("section");

    if (!hero) {
      throw new Error("The home hero section was not rendered.");
    }

    const productLinks = await within(hero).findAllByRole(
      "link",
      { name: /^view .+ details$/i },
    );

    expect(productLinks).toHaveLength(4);
    for (const link of productLinks) {
      expect(link.getAttribute("href")).toMatch(/^\/product\/.+/);
    }
  });
});
