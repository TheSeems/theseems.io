import { mount } from "svelte";
// Self-hosted so the Privacy note's "no third parties" holds; upright only (no italics in use).
// Archivo's wdth build, so names and headings can set it expanded; Chivo Mono (same foundry) for data.
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/chivo-mono/wght.css";
import "./app.css";
import { initMetrics } from "./lib/metrics.js";
import App from "./App.svelte";

mount(App, { target: /** @type {HTMLElement} */ (document.getElementById("app")) });
initMetrics();
