// Keep the historical storage keys readable while using one canonical favorites list.
export const FAVORITES_KEY = "hub-favorites-v2";
export const COMPARE_KEY = "hub-compare";
const MIGRATED_KEY = "hub-favorites-v2-migrated";

export function readStoredList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((id) => typeof id === "string") : [];
  } catch { return []; }
}

export function loadFavorites() {
  const current = readStoredList(FAVORITES_KEY);
  try {
    if (localStorage.getItem(MIGRATED_KEY) === "1") return current;
    const legacy = readStoredList("hub-favorites");
    const merged = [...new Set([...current, ...legacy])];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(merged));
    localStorage.setItem(MIGRATED_KEY, "1");
    localStorage.removeItem("hub-favorites");
    return merged;
  } catch { return current; }
}
