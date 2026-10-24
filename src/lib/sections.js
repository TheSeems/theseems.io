/** Single source of truth for primary nav / scroll-spy sections. */
export const sections = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const sectionIds = sections.map((s) => s.id);

/** Home stays spied (it gates the header CV) but isn't a nav item: the name in the header links to it. */
export const navSections = sections.filter((s) => s.id !== "home");
