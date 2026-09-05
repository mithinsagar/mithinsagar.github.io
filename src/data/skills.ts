export const skillGroups = [
  {
    id: "languages",
    title: "Languages",
    items: ["Java", "Python", "C", "JavaScript", "TypeScript", "SQL"],
  },
  {
    id: "genai",
    title: "Generative AI",
    items: [
      "LLM APIs",
      "Prompt engineering",
      "Retrieval-Augmented Generation",
      "Agentic workflows",
      "LangGraph",
      "FAISS",
      "Embeddings",
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    items: [
      "scikit-learn",
      "PyTorch",
      "pandas",
      "NumPy",
      "Cross-validation",
      "Model calibration",
    ],
  },
  {
    id: "web",
    title: "Web & Backend",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
      "Flask",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    id: "tools",
    title: "Tools & Practices",
    items: [
      "Git / GitHub",
      "GitHub Actions",
      "Docker",
      "pytest",
      "Vitest",
      "OOP",
      "Agile / Scrum",
    ],
  },
];

export const principles = [
  {
    n: "01",
    title: "The score is never the product",
    body: "A model that returns a number asks to be trusted. A system that returns the evidence behind the number can be checked. I build the second kind.",
  },
  {
    n: "02",
    title: "Determinism where it counts",
    body: "The part that produces the answer should be pure — no network, no clock, no randomness. The language model gets to write prose about the result, not change it.",
  },
  {
    n: "03",
    title: "Measure it or don’t claim it",
    body: "Ground truth manifests, held-out splits, calibration curves. If a number cannot be reproduced from the repository, it does not go in the README.",
  },
  {
    n: "04",
    title: "Failure should have an address",
    body: "One stage, one responsibility, one auditable handoff. When something breaks I want to know which component owned it before I open a file.",
  },
];
