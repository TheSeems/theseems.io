import { mount } from "svelte";
// Self-hosted so the Privacy note's "no third parties" holds; upright only (no italics in use).
import "@fontsource-variable/inter/opsz.css";
import "./app.css";
import { initMetrics } from "./lib/metrics.js";
import App from "./App.svelte";

mount(App, { target: /** @type {HTMLElement} */ (document.getElementById("app")) });
initMetrics();
