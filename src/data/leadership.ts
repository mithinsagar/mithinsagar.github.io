export type Role = {
  id: string;
  role: string;
  org: string;
  orgNote: string;
  period: string;
  scale: string;
  scope: string[];
  body: string;
  /** keys into media.json → leadership */
  photos: { main: string; left: string; right: string };
};

export const leadership: Role[] = [
  {
    id: "technovit",
    role: "Student Welfare Outreach Head",
    org: "TechnoVIT & Vibrance",
    orgNote: "VIT Chennai’s technical and cultural flagships",
    period: "2025 — 2026",
    scale: "25+ member team",
    scope: ["Sponsorship", "Publicity", "Media", "Outreach"],
    body: "Two flagship events in one cycle, with sponsorship, publicity and media run as a single function instead of three teams talking past each other. The job was less about running campaigns than about making sure twenty-five people knew what the other twenty-four were doing.",
    photos: { main: "outreach-main", left: "outreach-left", right: "outreach-right" },
  },
  {
    id: "voiceit",
    role: "Head of Visual Media",
    org: "VOICE-IT",
    orgNote: "VIT Chennai’s radio station club",
    period: "2024 — 2025",
    scale: "40+ member team",
    scope: ["Direction", "Shoot planning", "Editing", "Delivery"],
    body: "Owned the club’s visual output end to end across recurring shows and campus-wide campaigns. A 40-person creative team only works if the brief is unambiguous and the feedback loop is short — most of the role was maintaining both.",
    photos: { main: "voiceit-main", left: "voiceit-left", right: "voiceit-right" },
  },
];

export const stats = [
  { value: "65+", label: "people led across two organisations" },
  { value: "2", label: "flagship campus events" },
  { value: "2", label: "leadership terms, back to back" },
];

export const philosophy = {
  chain: ["People", "Ideas", "Impact"],
  body: "Every technical thing I have built started as a conversation with someone who had a problem. Leading a team taught me the part engineering courses skip: an idea only becomes impact when enough people understand it well enough to carry a piece of it.",
};
