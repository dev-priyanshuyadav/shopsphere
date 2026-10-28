type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem" | "clear"> & {
  length: number;
  key: (index: number) => string | null;
};

const memoryStorage = new Map<string, string>();

const makeMemoryStorage = (): StorageLike => ({
  get length() {
    return memoryStorage.size;
  },
  key(index: number) {
    return Array.from(memoryStorage.keys())[index] ?? null;
  },
  getItem(key: string) {
    return memoryStorage.has(key) ? memoryStorage.get(key) ?? null : null;
  },
  setItem(key: string, value: string) {
    memoryStorage.set(key, value);
  },
  removeItem(key: string) {
    memoryStorage.delete(key);
  },
  clear() {
    memoryStorage.clear();
  },
});

const getBrowserStorage = (): Storage | undefined => {
  try {
    if (typeof window === "undefined") {
      return undefined;
    }

    const storage = window.localStorage;
    const testKey = "__shopsphere_storage_probe__";
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return storage;
  } catch {
    return undefined;
  }
};

export const safeStorage = (() => {
  const browserStorage = getBrowserStorage();
  if (browserStorage) {
    return browserStorage;
  }

  return makeMemoryStorage() as Storage;
})();

export const storageReady = () => !!getBrowserStorage();
