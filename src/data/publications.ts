export type Publication = {
  id: string;
  title: string;
  venue: string;
  venueShort: string;
  host: string;
  year: string;
  status: string;
  authors: string[];
  abstract: string;
  keywords: string[];
  doi: string | null;
  paperUrl: string | null;
  codeUrl: string | null;
  placeholder?: boolean;
};

export const publications: Publication[] = [
  {
    id: "icandit-2026",
    title: "Automated AWS Resource Cleanup for Optimization of Cost and Security",
    venue:
      "2nd International Conference on Advanced Nexus of Data and Information Technology",
    venueShort: "ICANDIT 2026",
    host: "INTI International University, Malaysia",
    year: "2026",
    status: "Presented · publication pending",
    authors: ["Mithin Sagar S"],
    abstract:
      "Idle cloud resources sit unused and forgotten, quietly driving up cost and widening the attack surface. This work presents an event-driven Boto3 system that scans EC2, EBS, S3, IAM and RDS for waste, then reclaims it on a scheduled Lambda cron with dry-run simulation and protected-tag exclusions guarding against accidental deletes. A supervised classifier trained on utilisation metrics predicts a keep, review or delete recommendation for each resource, and statistical outlier detection surfaces anomalous cost spikes alongside the rule engine.",
    keywords: [
      "Cloud cost optimisation",
      "AWS",
      "Resource lifecycle",
      "Security posture",
      "Applied machine learning",
    ],
    doi: null,
    paperUrl: null,
    codeUrl: "https://github.com/mithinsagar/aws-ai-resource-cleanup",
  },
];

export const researchWork = [
  {
    id: "xai",
    title: "XAI Attack & Defense Framework with Few-Shot Learning",
    kind: "Technical report",
    year: "2026",
    summary:
      "Quantifies how far explanations can be manipulated without touching a prediction, using a formal Explanation Drift metric across four attack families and three security datasets — then proposes four defenses, the strongest cutting drift by up to 91%.",
    stat: { value: "91%", label: "drift reduction" },
    href: "/projects/xai-attack-defense",
    external: "https://github.com/mithinsagar/xai-attack-defense-framework",
    collaborators: "Collaborators on the original technical report: Gokul Ram K, Kishore A G.",
  },
  {
    id: "exai",
    title: "EXAI-ResumeIntel — Explainable Resume Analysis",
    kind: "Framework & evaluation",
    year: "2026",
    summary:
      "Exact Shapley values satisfying all four game-theoretic axioms, independently validated by LIME across 300 perturbation samples with 100% directional agreement, evaluated on 2,484 resumes across 24 job categories.",
    stat: { value: "70.73%", label: "overall accuracy" },
    href: "/projects/exai-resumeintel",
    external: "https://huggingface.co/spaces/mithinsagar/exai-resumeintel",
    collaborators: null,
  },
];

export const researchInterests = [
  {
    title: "Explainability that survives contact",
    body: "An explanation is only useful if it holds up when someone tries to break it. I care about measuring that, not asserting it.",
  },
  {
    title: "Calibration and honest uncertainty",
    body: "A confidently wrong answer is worse than no answer. Reported confidence should match observed accuracy.",
  },
  {
    title: "Retrieval over recall",
    body: "Systems that fetch evidence and cite it, rather than systems that remember and hope.",
  },
  {
    title: "Agentic pipelines with owned stages",
    body: "One agent, one responsibility, one auditable handoff — so a failure has an address.",
  },
];
