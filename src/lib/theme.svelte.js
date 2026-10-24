/** Also read by the pre-paint script in index.html; keep the two in sync. */
const STORAGE_KEY = "theseems-theme";

const media =
  typeof globalThis !== "undefined" && "matchMedia" in globalThis
    ? globalThis.matchMedia("(prefers-color-scheme: dark)")
    : null;

function systemTheme() {
  return media?.matches ? "dark" : "light";
}

// Storage access throws when site data is blocked (e.g. Firefox with cookies off); the theme
// then simply isn't remembered.
function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    // fall through
  }
  return null;
}

/** @param {string | null} value — null clears the override, so the OS preference applies again. */
function writeStored(value) {
  try {
    if (value === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // not persisted
  }
}

export const theme = $state({
  value: readStored() ?? systemTheme(),
});

function syncDom() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme.value === "dark");
}

syncDom();

// With no saved override, follow the OS as it changes (e.g. automatic dark mode at sunset).
media?.addEventListener("change", () => {
  if (readStored()) return;
  theme.value = systemTheme();
  syncDom();
});

export function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  syncDom();
  // Choosing what the OS already shows means "follow the system" again, so drop the override.
  writeStored(theme.value === systemTheme() ? null : theme.value);
}
