export type Award = {
  id: string;
  title: string;
  detail: string;
  org: string;
  year: string;
  kind: "award" | "research" | "internship";
  /** path to a verifiable document in /public/certificates */
  file?: string;
};

export const awards: Award[] = [
  {
    id: "figma",
    title: "Second Runner-Up",
    detail: "Figma × Apple Vision Pro Design Challenge",
    org: "GDSC, VIT Chennai",
    year: "2023",
    kind: "award",
  },
  {
    id: "icandit",
    title: "Paper presented",
    detail: "Automated AWS Resource Cleanup for Optimization of Cost and Security",
    org: "ICANDIT 2026 · INTI International University, Malaysia",
    year: "2026",
    kind: "research",
  },
  {
    id: "igcar",
    title: "Machine Learning Internship",
    detail: "Deep Learning & Computer Vision — weld defect localization",
    org: "Indira Gandhi Centre for Atomic Research (IGCAR)",
    year: "2025",
    kind: "internship",
    file: "/certificates/igcar-internship.pdf",
  },
];

export type Cert = {
  id: string;
  name: string;
  issuer: string;
  track?: string;
  /** path to the certificate PDF in /public/certificates */
  file?: string;
};

export const certifications: Cert[] = [
  {
    id: "genai",
    name: "Introduction to Generative AI",
    issuer: "Google Cloud",
  },
  {
    id: "pyds",
    name: "Python Data Structures",
    issuer: "University of Michigan",
    file: "/certificates/python-data-structures.pdf",
  },
  {
    id: "py4e",
    name: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan",
    file: "/certificates/programming-for-everybody.pdf",
  },
  {
    id: "ux-found",
    name: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    track: "Google UX Design",
    file: "/certificates/ux-foundations.pdf",
  },
  {
    id: "ux-process",
    name: "Start the UX Design Process: Empathize, Define, Ideate",
    issuer: "Google",
    track: "Google UX Design",
    file: "/certificates/ux-process.pdf",
  },
  {
    id: "ux-wire",
    name: "Build Wireframes and Low-Fidelity Prototypes",
    issuer: "Google",
    track: "Google UX Design",
    file: "/certificates/ux-wireframes.pdf",
  },
];
