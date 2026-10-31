import projects from "./data/projects.json";
import { email } from "./lib/contact.js";

/**
 * The page as Markdown for agents that ask for it (Accept: text/markdown); nginx-site.conf picks
 * the file. The prose mirrors src/page/*.svelte by hand. The projects come from projects.json in
 * the page's order, so they never drift.
 */

const links = {
  github: "[GitHub](https://github.com/theseems)",
  linkedin: "[LinkedIn](https://www.linkedin.com/in/theseems)",
  telegram: "[Telegram](https://t.me/theseems)",
  email: `[${email}](mailto:${email})`,
};

/** @param {typeof projects} list */
const projectList = (list) =>
  list
    .map((p) => `- **[${p.title}](${p.url})** · ${p.year} · ${p.tags.join(", ")}\n  ${p.description}`)
    .join("\n");

// Same split as src/page/Projects.svelte: featured picks, other picks, then the rest newest first
const picks = projects.filter((p) => p.pinned === true);
const shown = [...picks.filter((p) => p.featured === true), ...picks.filter((p) => p.featured !== true)];
const archive = projects.filter((p) => p.pinned !== true).sort((a, b) => b.year - a.year);

const page = `# Aleksei Akhundov

Software Engineer · Data Systems · Backend

Belgrade, Serbia · @theseems

I'm on the indexing team at [Databricks](https://www.databricks.com/company/about-us), making queries fast. Before that: data platforms and backend systems. Graduated from [HSE](https://cs.hse.ru/en).

Outside work: open source, homelabs, and distributed systems.

[CV](https://theseems.io/cv) (PDF) · ${links.github} · ${links.linkedin} · ${links.telegram} · ${links.email}

## Work

**Data systems, end to end.** I like owning a system the whole way: design, implementation, CI/CD, observability, and being on call for it.

**Making things faster.** Much of my work has been about speed: how fast jobs start, tests run, releases ship and queries come back.

**Tools for other engineers.** I've built tools my teammates used every day, from CI/CD pipelines to an IntelliJ plugin for data engineers.

## Side projects

${projectList(shown)}

### More projects

${projectList(archive)}

More projects on ${links.github}.

## Contact

Open to collaborations, open-source, work.

${links.email} · ${links.github} · ${links.linkedin} · ${links.telegram}
`;

/**
 * Emits the page above as index.md next to index.html.
 * @returns {import("vite").Plugin}
 */
export function pageMarkdown() {
  return {
    name: "page-markdown",
    apply: "build",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "index.md", source: page });
    },
  };
}
