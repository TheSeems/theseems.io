# Sources for [my web page](https://theseems.io)

Personal site: **Svelte 5**, **Vite 6**, **Tailwind CSS 4** via **`@tailwindcss/vite`**, custom minimal UI.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — ESLint (JS + Svelte rules)
- `npm run check` — svelte-check (type-checks JS via JSDoc, Svelte diagnostics)

## Analytics (optional)

Production builds can load [Umami](https://umami.is/) when `VITE_UMAMI_URL` and `VITE_UMAMI_WEBSITE_ID` are set (see `.env.example`). Omit them to ship without tracking.
