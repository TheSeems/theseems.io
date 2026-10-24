/// <reference types="svelte" />
/// <reference types="vite/client" />

/** Umami tracker global (set by script.js once it loads). */
declare var umami: { track(name: string, data?: Record<string, string | number | boolean>): void } | undefined;
