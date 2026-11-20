export interface JourneyEntry {
  date: string;
  title: string;
  description: string;
}

export const journey: JourneyEntry[] = [
  {
    date: "March 2026",
    title: "Learning to code with Scratch and WoofJS",
    description:
      "Started my tech journey with Scratch and WoofJS while voluntarily teaching Scratch to over 450 students.",
  },
  {
    date: "May 2026",
    title: "Product design",
    description:
      "Two months learning product design: user research, UX principles, and designing interfaces in Figma.",
  },
  {
    date: "July 2026",
    title: "Digital marketing",
    description:
      "Two months learning digital marketing and e-commerce fundamentals.",
  },
  {
    date: "September 2026",
    title: "Software development",
    description:
      "Moved into full-stack development: Python and Django, then JavaScript, TypeScript, React, and Next.js.",
  },
  {
    date: "Now",
    title: "Databases and SQL",
    description:
      "Learning database design and SQL to build complete, data-driven applications.",
  },
];
