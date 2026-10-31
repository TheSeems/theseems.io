# Sources for [my web page](https://theseems.io)

Personal site: **Svelte 5**, **Vite 6**, **Tailwind CSS 4** via **`@tailwindcss/vite`**, custom minimal UI.

## Scripts

Uses [pnpm](https://pnpm.io).

- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm preview` — preview production build
- `pnpm lint` — ESLint (JS + Svelte rules)
- `pnpm check` — svelte-check (type-checks JS via JSDoc, Svelte diagnostics)

## Deployment

Every push to `main` that passes CI is built into `ghcr.io/theseems/theseems.io` and rolled out
by Flux. The `CI / deploy` check turns green once theseems.io serves that commit
(`/version.json`). CI runs only for `main`: on push, or by hand from the Actions tab ("Run workflow").

Cache headers live in `nginx-site.conf`. Anything under `/assets/` has a content hash in its name, so
browsers and Cloudflare keep it for a year. The page itself gets checked on every visit.

## Analytics (optional)

Production builds can load [Umami](https://umami.is/) when `VITE_UMAMI_URL` and `VITE_UMAMI_WEBSITE_ID` are set (see `.env.example`). Omit them to ship without tracking.
