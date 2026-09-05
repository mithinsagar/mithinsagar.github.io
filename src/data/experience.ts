export type EntryKind = "education" | "work" | "leadership" | "research";

export type Entry = {
  id: string;
  kind: EntryKind;
  period: string;
  start: string;
  role: string;
  org: string;
  place: string;
  summary: string;
  points: string[];
  tech?: string[];
  impact?: string;
  ongoing?: boolean;
};

export const timeline: Entry[] = [
  {
    id: "vit",
    kind: "education",
    period: "Aug 2023 — May 2027",
    start: "2023",
    role: "B.Tech, Computer Science and Engineering",
    org: "Vellore Institute of Technology, Chennai",
    place: "Chennai, India",
    summary: "Specialisation in Artificial Intelligence and Machine Learning.",
    points: [
      "Coursework across machine learning, deep learning, computer vision and explainable AI, carried into project work rather than left on the transcript.",
      "Most of the systems in this portfolio started as coursework and kept going after the deadline.",
    ],
    ongoing: true,
  },
  {
    id: "voiceit",
    kind: "leadership",
    period: "2024 — 2025",
    start: "2024",
    role: "Head of Visual Media",
    org: "VOICE-IT — VIT Chennai’s radio station club",
    place: "Chennai, India",
    summary: "Led a 40+ member visual media team.",
    points: [
      "Owned the club’s visual output end to end — direction, shoot planning, edit and delivery.",
      "Ran a 40+ member team across recurring shows and campus-wide campaigns.",
    ],
    impact: "40+ member team",
  },
  {
    id: "igcar",
    kind: "work",
    period: "May 2025 — Jun 2025",
    start: "2025",
    role: "Machine Learning Intern — Deep Learning & Computer Vision",
    org: "Indira Gandhi Centre for Atomic Research (IGCAR)",
    place: "Kalpakkam, India",
    summary:
      "Weld inspection was manual and inconsistent between inspectors. I owned an automated defect-localization pipeline end to end.",
    points: [
      "Fine-tuned a YOLOv8-L detector on high-resolution weld imagery, owning the pipeline from data to evaluation.",
      "Curated and labelled the dataset, ran 100 GPU training epochs, and evaluated on precision, recall, F1 and mAP — 99.1% on training against 74.3% held-out.",
      "Diagnosed the gap as overfitting, revised the dataset and splits, and presented the trade-offs and next steps directly to the scientific staff.",
    ],
    tech: ["YOLOv8", "PyTorch", "Ultralytics", "OpenCV", "Python"],
    impact: "Later rebuilt as WeldSight",
  },
  {
    id: "technovit",
    kind: "leadership",
    period: "2025 — 2026",
    start: "2025",
    role: "Student Welfare Outreach Head",
    org: "TechnoVIT & Vibrance, VIT Chennai",
    place: "Chennai, India",
    summary: "Led a 25+ member team across sponsorship, publicity and media for two flagship events.",
    points: [
      "Coordinated outreach for VIT Chennai’s technical and cultural flagships in the same cycle.",
      "Ran sponsorship, publicity and media as one function rather than three disconnected teams.",
    ],
    impact: "25+ member team · 2 flagship events",
    ongoing: true,
  },
  {
    id: "icandit",
    kind: "research",
    period: "2026",
    start: "2026",
    role: "Paper presented — Automated AWS Resource Cleanup",
    org: "ICANDIT 2026, INTI International University",
    place: "Malaysia",
    summary:
      "Presented at the 2nd International Conference on Advanced Nexus of Data and Information Technology.",
    points: [
      "Event-driven Boto3 system scanning EC2, EBS, S3, IAM and RDS for waste, reclaiming it on a scheduled Lambda cron.",
      "Dry-run simulation and protected-tag exclusions guard against accidental deletes.",
    ],
    tech: ["Python", "Boto3", "AWS Lambda", "scikit-learn"],
    impact: "Publication pending",
  },
];
