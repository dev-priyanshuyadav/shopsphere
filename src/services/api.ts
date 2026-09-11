export class ApiError extends Error {
  public statusCode: number;
  public details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

/**
 * Simulates realistic network latency for asynchronous operations.
 * During testing, delay can be bypassed.
 */
export const delay = (ms = 250): Promise<void> => {
  if (process.env.NODE_ENV === "test") {
    return Promise.resolve();
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
};
