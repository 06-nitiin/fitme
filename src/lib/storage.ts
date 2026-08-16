export const STORAGE_KEYS = {
  avatar: "fitme:avatar",
  savedOutfits: "fitme:saved-outfits",
  wardrobe: "fitme:wardrobe",
} as const;

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (!storedValue) {
      return fallback;
    }

    return JSON.parse(storedValue) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can fail if the browser is in private mode or has no remaining space.
    // The UI will continue to work for the current session even when persistence fails.
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // There is nothing else the application needs to do if the browser rejects removal.
  }
}
