import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock window.scrollTo for jsdom test environment
Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});
