import { describe, it, expect, beforeEach } from "vitest";
import { productService, INITIAL_PRODUCTS } from "./productService";
import { ApiError } from "./api";

describe("productService", () => {
  beforeEach(async () => {
    localStorage.clear();
    await productService.resetDefaultProducts();
  });

  it("fetches all products with default pagination", async () => {
    const result = await productService.getProducts({ page: 1, limit: 10 });
    expect(result.data.length).toBe(10);
    expect(result.total).toBe(INITIAL_PRODUCTS.length);
    expect(result.totalPages).toBe(Math.ceil(INITIAL_PRODUCTS.length / 10));
  });

  it("filters products by category", async () => {
    const result = await productService.getProducts({
      category: "electronics",
    });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((p) => p.category === "electronics")).toBe(true);
  });

  it("filters products by search keyword across title, brand, or tags", async () => {
    const result = await productService.getProducts({ search: "headphones" });
    expect(result.data.length).toBeGreaterThanOrEqual(1);
    expect(result.data[0].title).toMatch(/headphones/i);
  });

  it("filters products by price range", async () => {
    const minPrice = 50;
    const maxPrice = 120;
    const result = await productService.getProducts({ minPrice, maxPrice });

    expect(result.data.length).toBeGreaterThan(0);
    expect(
      result.data.every((p) => p.price >= minPrice && p.price <= maxPrice),
    ).toBe(true);
  });

  it("sorts products by price in ascending and descending order", async () => {
    const ascResult = await productService.getProducts({ sortBy: "price-asc" });
    for (let i = 0; i < ascResult.data.length - 1; i++) {
      expect(ascResult.data[i].price).toBeLessThanOrEqual(
        ascResult.data[i + 1].price,
      );
    }

    const descResult = await productService.getProducts({
      sortBy: "price-desc",
    });
    for (let i = 0; i < descResult.data.length - 1; i++) {
      expect(descResult.data[i].price).toBeGreaterThanOrEqual(
        descResult.data[i + 1].price,
      );
    }
  });

  it("includes the expanded catalog of sample products", async () => {
    const result = await productService.getProducts({
      search: "summit alpine",
    });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0].title).toMatch(/summit alpine/i);
  });

  it("keeps at least 100 products and removes products without images", async () => {
    localStorage.setItem(
      "shopsphere_products_db",
      JSON.stringify([
        ...INITIAL_PRODUCTS,
        {
          ...INITIAL_PRODUCTS[0],
          id: "image-less-product",
          images: [],
        },
      ]),
    );

    const result = await productService.getProducts({ limit: 200 });

    expect(result.total).toBeGreaterThanOrEqual(100);
    expect(
      result.data.some((product) => product.id === "image-less-product"),
    ).toBe(false);
    expect(result.data.every((product) => product.images.some(Boolean))).toBe(
      true,
    );
  });

  it("refreshes an older local catalog with the expanded seed", async () => {
    localStorage.removeItem("shopsphere_products_db_version");
    localStorage.setItem(
      "shopsphere_products_db",
      JSON.stringify(INITIAL_PRODUCTS.slice(0, 16)),
    );

    const result = await productService.getProducts({ limit: 200 });

    expect(result.total).toBe(INITIAL_PRODUCTS.length);
  });

  it("retrieves single product by ID", async () => {
    const product = await productService.getProductById("prod-1");
    expect(product.id).toBe("prod-1");
    expect(product.title).toBe(INITIAL_PRODUCTS[0].title);
  });

  it("throws 404 ApiError when product ID does not exist", async () => {
    await expect(productService.getProductById("invalid-id")).rejects.toThrow(
      ApiError,
    );
  });

  it("creates, updates, and deletes products (Admin CRUD)", async () => {
    // 1. Create
    const created = await productService.createProduct({
      title: "Ergonomic Standing Desk",
      description:
        "Motorized dual-motor adjustable standing desk with bamboo top.",
      price: 499.0,
      category: "home",
      images: ["https://images.unsplash.com/test.jpg"],
      rating: 5.0,
      reviewCount: 1,
      stock: 10,
      brand: "ErgoLife",
      tags: ["desk", "office"],
    });

    expect(created.id).toBeDefined();
    expect(created.title).toBe("Ergonomic Standing Desk");

    // Verify it exists in catalog
    const fetched = await productService.getProductById(created.id);
    expect(fetched.title).toBe("Ergonomic Standing Desk");

    // 2. Update
    const updated = await productService.updateProduct(created.id, {
      price: 449.0,
      stock: 8,
    });
    expect(updated.price).toBe(449.0);
    expect(updated.stock).toBe(8);

    // 3. Delete
    const deleted = await productService.deleteProduct(created.id);
    expect(deleted).toBe(true);

    // Verify it no longer exists
    await expect(productService.getProductById(created.id)).rejects.toThrow(
      ApiError,
    );
  });
});
