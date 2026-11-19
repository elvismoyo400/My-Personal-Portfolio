export interface Project {
  number: string;
  name: string;
  kind: string;
  description: string;
  tools: string[];
  liveDemo: string | null;
  github: string | null;
  previewImage: string | null;
}

export const projects: Project[] = [
  {
    number: "01",
    name: "Nyamatusi Website",
    kind: "Safari camp · Website",
    description:
      "A modern website for Nyamatusi Safari Camp, showcasing the camp’s story, activities, wildlife sightings, itineraries, testimonials, and gallery in an immersive design.",
    tools: ["JavaScript", "Tailwind CSS", "TypeScript"],
    liveDemo: "https://nyamatusi-sigma.vercel.app/",
    github: "https://github.com/elvismoyo400/Nyamatusi.git",
    previewImage: "/nyamatusi-preview.png",
  },
  {
    number: "02",
    name: "Quiz App",
    kind: "Education · Interactive web application",
    description:
      "An interactive quiz application designed to test users' knowledge through multiple-choice questions, provide instant feedback, track scores, and allow users to restart quizzes.",
    tools: ["JavaScript", "TypeScript", "JSX", "Tailwind CSS"],
    liveDemo: "https://quiz-app-eosin-tau.vercel.app/",
    github: "https://github.com/elvismoyo400/Quiz-App.git",
    previewImage: "/Quizapp.png",
  },
  {
    number: "03",
    name: "Gwaai Valley Secondary School Website",
    kind: "Education · School website",
    description:
      "A modern school website designed to showcase the school's identity, provide information about academic programmes, admissions, and school activities, and improve communication between the school, students, parents, and the wider community.",
    tools: ["React", "JavaScript", "Tailwind CSS", "JSX", "Responsive Web Design"],
    liveDemo: "https://gwaai-valley-website.vercel.app/",
    github: "https://github.com/elvismoyo400/Gwaai-Valley-website.git",
    previewImage: "/schoolwebsite.png",
  },
];
