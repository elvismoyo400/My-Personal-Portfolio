export interface Project {
  number: string;
  name: string;
  kind: string;
  problem: string;
  role: string;
  stack: string[];
  highlights: string[];
  liveDemo: string | null;
  github: string | null;
  previewImage: string | null;
}

export const projects: Project[] = [
  {
    number: "01",
    name: "MobileParts Pro",
    kind: "Zimbabwe market · Personal project",
    problem:
      "Create a structured e-commerce platform for customers to browse and enquire about cellphone parts in the Zimbabwean market.",
    role: "Solo developer",
    stack: ["Django", "Python", "HTML", "CSS", "JavaScript"],
    highlights: [
      "Product browsing and structured product listings",
      "Django-based application architecture",
      "Responsive interface for phone and desktop users",
    ],
    liveDemo: "[ADD: live URL]",
    github: "[ADD: GitHub URL]",
    previewImage: "[ADD: screenshot]",
  },
  {
    number: "02",
    name: "Nyamatusi Website",
    kind: "Personal project · Safari camp website",
    problem:
      "Present a safari camp's story, activities, wildlife information, itineraries, testimonials, and gallery in one accessible website.",
    role: "Designer and front-end developer",
    stack: ["JavaScript", "Tailwind CSS", "TypeScript"],
    highlights: [
      "Immersive destination and gallery presentation",
      "Responsive sections for activities and itineraries",
      "Informational content organised for prospective visitors",
    ],
    liveDemo: "https://nyamatusi-sigma.vercel.app/",
    github: "https://github.com/elvismoyo400/Nyamatusi.git",
    previewImage: "/nyamatusi-preview.png",
  },
  {
    number: "03",
    name: "Quiz App",
    kind: "Personal project · Education",
    problem:
      "Give learners a simple interactive way to answer multiple-choice questions and see their score.",
    role: "Solo developer",
    stack: ["JavaScript", "TypeScript", "JSX", "Tailwind CSS"],
    highlights: [
      "Multiple-choice quiz flow",
      "Immediate feedback and score tracking",
      "Restartable quiz experience",
    ],
    liveDemo: "https://quiz-app-eosin-tau.vercel.app/",
    github: "https://github.com/elvismoyo400/Quiz-App.git",
    previewImage: "/Quizapp.png",
  },
  {
    number: "04",
    name: "Gwaai Valley Secondary School Website",
    kind: "[ADD: Personal project or real client] · School website",
    problem:
      "Make school information easier to find and improve communication through a clear public-facing website.",
    role: "Designer and developer",
    stack: ["React", "JavaScript", "Tailwind CSS", "JSX", "Responsive Web Design"],
    highlights: [
      "School identity and programme information",
      "Admissions and school activity sections",
      "Responsive layout for students, parents, and visitors",
    ],
    liveDemo: "https://gwaai-valley-website.vercel.app/",
    github: "https://github.com/elvismoyo400/Gwaai-Valley-website.git",
    previewImage: "/schoolwebsite.png",
  },
];
