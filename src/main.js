import { mount } from "svelte";
import "./app.css";
import { initMetrics } from "./lib/metrics.js";
import App from "./App.svelte";

mount(App, { target: /** @type {HTMLElement} */ (document.getElementById("app")) });
initMetrics();
