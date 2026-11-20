import type { IconType } from "react-icons";
import {
  FaDiagramProject,
  FaPalette,
  FaMobileScreenButton,
  FaPenRuler,
} from "react-icons/fa6";
import { FaJava } from "react-icons/fa";
import {
  SiCss,
  SiDjango,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type SkillCategory =
  | "Core"
  | "Working knowledge"
  | "Currently learning";

export interface Skill {
  name: string;
  icon: IconType;
  category: SkillCategory;
}

export const skills: Skill[] = [
  { name: "HTML", icon: SiHtml5, category: "Core" },
  { name: "CSS", icon: SiCss, category: "Core" },
  { name: "JavaScript", icon: SiJavascript, category: "Core" },
  { name: "React", icon: SiReact, category: "Core" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Core" },
  { name: "Python", icon: SiPython, category: "Core" },
  { name: "Django", icon: SiDjango, category: "Core" },
  { name: "Git", icon: SiGit, category: "Core" },
  { name: "GitHub", icon: SiGithub, category: "Core" },
  { name: "TypeScript", icon: SiTypescript, category: "Working knowledge" },
  { name: "Next.js", icon: SiNextdotjs, category: "Working knowledge" },
  { name: "Figma", icon: SiFigma, category: "Working knowledge" },
  { name: "Canva", icon: FaPalette, category: "Working knowledge" },
  { name: "UI/UX Design", icon: FaPenRuler, category: "Working knowledge" },
  {
    name: "Responsive Design",
    icon: FaMobileScreenButton,
    category: "Working knowledge",
  },
  { name: "SQL and Databases", icon: SiPostgresql, category: "Currently learning" },
  { name: "Java", icon: FaJava, category: "Currently learning" },
  {
    name: "Data Structures and Algorithms",
    icon: FaDiagramProject,
    category: "Currently learning",
  },
];
