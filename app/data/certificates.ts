export type CertificateKind = "Course certificate" | "Professional certificate";

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  dateTime: string;
  kind: CertificateKind;
  verifyUrl: string;
}

export const certificates: Certificate[] = [
  {
    title: "Crash Course on Python",
    issuer: "Google",
    date: "Jul 21, 2026",
    dateTime: "2026-07-21",
    kind: "Course certificate",
    verifyUrl: "https://coursera.org/verify/LAGON9I0RTY6",
  },
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "Jul 22, 2026",
    dateTime: "2026-07-22",
    kind: "Professional certificate",
    verifyUrl: "https://coursera.org/verify/professional-cert/M6WSTNLFHRE1",
  },
  {
    title: "Python for Data Science & AI: Hands-On Development",
    issuer: "IBM",
    date: "Jul 24, 2026",
    dateTime: "2026-07-24",
    kind: "Course certificate",
    verifyUrl: "https://coursera.org/verify/09TKSE7TXO65",
  },
  {
    title: "Introduction to Python Programming",
    issuer: "University of Pennsylvania",
    date: "Aug 13, 2026",
    dateTime: "2026-08-13",
    kind: "Course certificate",
    verifyUrl: "https://coursera.org/verify/7SC9XMRGUJKN",
  },
  {
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    date: "Aug 15, 2026",
    dateTime: "2026-08-15",
    kind: "Course certificate",
    verifyUrl: "https://coursera.org/verify/0WWW2PMNP8GF",
  },
  {
    title: "Google Digital Marketing & E-commerce Professional Certificate",
    issuer: "Google",
    date: "Aug 26, 2026",
    dateTime: "2026-08-26",
    kind: "Professional certificate",
    verifyUrl: "https://coursera.org/verify/professional-cert/4IKQKGVPXGRT",
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    date: "Sep 30, 2026",
    dateTime: "2026-09-30",
    kind: "Course certificate",
    verifyUrl: "https://coursera.org/verify/PVNZBJ56U3BF",
  },
];
