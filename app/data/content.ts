export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Journey", href: "#journey" },
  { label: "Certificates", href: "#certificates" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: ["Junior Full-Stack Developer", "Lupane, Mat North Province, Zimbabwe"],
  tagline:
    "Junior Full-Stack Developer based in Lupane, Zimbabwe. I build practical web applications with Django and React for real businesses, schools, and communities.",
  availability: "Open to internships, junior roles, and freelance projects.",
} as const;

export interface Experience {
  organization: string;
  period: string;
  title: string;
  summary: string;
  responsibilities: string[];
}

export const experience: Experience = {
  organization: "Independent Development & Projects",
  period: "2026 - Present",
  title: "Junior Full-Stack Developer",
  summary:
    "Building practical software experience through hands-on projects and continuous learning, with a focus on useful, responsive web applications.",
  responsibilities: [
    "Building responsive interfaces with React and JavaScript.",
    "Developing web applications with Python and Django.",
    "Creating reusable components and layouts with Tailwind CSS.",
    "Using Git and GitHub for version control.",
  ],
};

export const contactMethods = [
  {
    label: "Email",
    detail: "elvismoyo400@gmail.com",
    href: "mailto:elvismoyo400@gmail.com?subject=Portfolio%20inquiry",
    icon: "email",
    external: false,
  },
  {
    label: "WhatsApp",
    detail: "+263 716 144 042",
    href: "https://wa.me/263716144042?text=Hi%20Elvis%2C%20I%20found%20your%20portfolio.",
    icon: "whatsapp",
    external: true,
  },
] as const;
