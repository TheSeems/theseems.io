/// <reference types="svelte" />
/// <reference types="vite/client" />

/** Year the site was built, from `define` in vite.config.js. */
declare const __BUILD_YEAR__: number;

/** Full commit SHA of this build, or "dev" outside the Docker build; from `define` in vite.config.js. */
declare const __BUILD_SHA__: string;

/** Umami tracker global (set by script.js once it loads). */
declare var umami: { track(name: string, data?: Record<string, string | number | boolean>): void } | undefined;
