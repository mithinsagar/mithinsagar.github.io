import media from "./media.json";

export type Media = { src: string; w: number; h: number; lqip: string };

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  year: string;
  categories: string[];
  /** one-line hook used on cards */
  hook: string;
  problem: string;
  solution: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  tech: string[];
  github: string | null;
  demo: string | null;
  demoLabel?: string;
  featured: boolean;
  /** designed cover fallback when no product screenshot exists */
  coverKey?: keyof typeof media.projects;
  /** monogram + schematic seed for generated covers */
  glyph: string;
  accent: "ember" | "rust" | "blood";
  note?: string;
};

export const CATEGORIES = [
  "All",
  "Agentic AI",
  "Machine Learning",
  "Explainable AI",
  "Computer Vision",
  "Cloud",
  "Full-Stack",
  "Game",
] as const;

export const projects: Project[] = [
  {
    slug: "flashforensics-ai",
    name: "FlashForensics AI",
    subtitle: "Agentic recovery for corrupted flash storage",
    year: "2026",
    categories: ["Agentic AI", "Machine Learning"],
    hook: "PhotoRec tells you it found 9,000 files. This tells you which 40 are your photos, and why.",
    problem:
      "When an SD card’s allocation table dies, the bytes are all still there and nothing knows where any file begins or ends. Signature carvers answer this by handing you nine thousand nameless fragments — most garbage, a few your wedding pictures — with no idea which is which. The bottleneck in data recovery was never finding bytes. It is triage.",
    solution:
      "A multi-agent pipeline on LangGraph where each agent owns one stage: a hand-written FAT32/exFAT parser that recovers geometry from the backup boot sector, Shannon-entropy mapping to locate damage, signature carving of orphaned regions, then classification and a recoverability verdict per fragment. Ambiguous signatures — every zip container starts with the same four bytes — are resolved by semantic retrieval over an embedded file-type index rather than a lookup table, with an LLM writing the final verdict.",
    highlights: [
      "Pure-Python FAT32 and exFAT parsers — no pytsk3, no compiled dependency — that reconcile both FAT copies and record every structural inconsistency as evidence instead of raising on the first one.",
      "One entropy pass over the volume tells carving where to skip; an entropy cliff mid-stream is itself proof a file was truncated.",
      "Structural evidence first, retrieval over a 69-format knowledge base second, a language model only for what those leave open.",
      "Every claim is graded against a manifest of what was really done to the fixture card — the demo is a measurement, not an animation.",
    ],
    metrics: [
      { value: "100%", label: "recall on planted files" },
      { value: "0", label: "false positives" },
      { value: "69", label: "formats in the index" },
      { value: "82", label: "tests passing" },
    ],
    tech: ["Python", "LangGraph", "LLM Agents", "FastAPI", "Embeddings", "Next.js", "TypeScript"],
    github: "https://github.com/mithinsagar/flashforensics-ai",
    demo: "https://frontend-mithin-sagar.vercel.app",
    demoLabel: "Run a real recovery",
    featured: true,
    coverKey: "flashforensics-ai",
    glyph: "FF",
    accent: "ember",
    note: "The API sleeps on its free tier — the first request after a quiet spell takes about a minute to wake it.",
  },
  {
    slug: "signal",
    name: "Signal",
    subtitle: "Explainable resume-to-role matching",
    year: "2026",
    categories: ["Agentic AI", "Full-Stack"],
    hook: "Most tools hand you a score. This one shows its work.",
    problem:
      "A keyword matcher says a resume 'matches 60%' and stops — answering none of the questions anyone actually has. Which 40% is missing, does any of it matter, and what changes if I fix one thing?",
    solution:
      "One constraint shapes the whole codebase: the score must be reproducible and the reasoning inspectable. The scoring engine is pure — no network, no model, no clock — so the same two documents always produce the same number, and it always completes. The language model runs after there is already a complete result and can only write prose about it; it cannot move the score.",
    highlights: [
      "143 canonical skills across 10 categories and 399 surface forms, so 'postgres', 'PostgreSQL' and 'psql' never report a gap that isn’t there.",
      "Requirement weighting reads the posting’s own framing — a 'Must have' counts 3×, a 'Nice to have' 1× — with line-level markers overriding their section.",
      "'PyTorch or TensorFlow' is parsed as one requirement any member satisfies, not two false gaps.",
      "With no API key configured at all, Signal still does everything except write the narrative. That is not a degraded mode; it is the product working as designed.",
    ],
    metrics: [
      { value: "143", label: "canonical skills" },
      { value: "399", label: "surface forms" },
      { value: "50", label: "tests passing" },
      { value: "0", label: "documents stored" },
    ],
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Motion", "unpdf", "Tesseract.js", "Vitest"],
    github: "https://github.com/mithinsagar/signal-resume-match",
    demo: "https://signal-resume-match.vercel.app",
    demoLabel: "Try it live",
    featured: true,
    coverKey: "signal",
    glyph: "SG",
    accent: "rust",
  },
  {
    slug: "weldsight",
    name: "WeldSight",
    subtitle: "Weld defect detection you can interrogate",
    year: "2026",
    categories: ["Computer Vision", "Machine Learning"],
    hook: "A detector that only prints 'defect: 0.81' asks you to trust it. This one is built the other way round.",
    problem:
      "Weld inspection is manual and inconsistent between inspectors, and a model that returns a single number does nothing to fix that — it just relocates the trust problem. The score is never the product; the evidence is.",
    solution:
      "A YOLOv8-L detector finds the faults, and the interface shows every box it drew, how sure it was, and exactly which detections produced the verdict. PASS / REVIEW / REJECT is a pure rule you can read in twenty seconds, not a model output. The server sends every box above 0.05 once, and the threshold slider, class toggles and verdict badge all recompute locally — which is why dragging the slider is instant and the number at 0.42 is the model’s actual output.",
    highlights: [
      "Live confidence threshold from 0.05 to 0.95 with no round trip and no re-inference.",
      "Boxes rendered on a canvas the app controls: hover to highlight its row, click a row to fly the viewport to that detection, hold to see the untouched photo underneath.",
      "Every verdict states the count and the confidence that produced it — '4 fault regions detected, strongest at 92% confidence.'",
      "Grew out of the IGCAR internship pipeline, rebuilt as an interrogable product.",
    ],
    metrics: [
      { value: "77.3%", label: "val mAP@0.5" },
      { value: "6", label: "built-in test images" },
      { value: "0.05", label: "confidence floor sent" },
    ],
    tech: ["YOLOv8-L", "PyTorch", "Ultralytics", "FastAPI", "ONNX", "Groq", "Docker"],
    github: "https://github.com/mithinsagar/weldsight-defect-detection",
    demo: null,
    featured: true,
    coverKey: "weldsight",
    glyph: "WS",
    accent: "ember",
  },
  {
    slug: "medixplain",
    name: "MediXplain",
    subtitle: "Calibrated disease prediction with retrieved evidence",
    year: "2026",
    categories: ["Machine Learning", "Explainable AI"],
    hook: "In symptom checking, a confidently wrong answer is worse than no answer.",
    problem:
      "Symptom checkers return a label and a percentage that means nothing — the confidence is uncalibrated, and there is no evidence a user could independently verify.",
    solution:
      "Seven scikit-learn classifiers are trained and benchmarked in one command and the best is persisted automatically. Probability calibration aligns reported confidence with observed accuracy, predictions are returned as a top-3 differential rather than one hard label, and a FAISS retrieval layer over 384-dimensional sentence-transformer embeddings attaches supporting medical evidence to every prediction.",
    highlights: [
      "Logistic Regression, Linear SVM, Bernoulli NB, Decision Tree, Random Forest, AdaBoost and an MLP, 5-fold cross-validated.",
      "FAISS vector search over a paragraph knowledge base, with a TF-IDF path retained as a lightweight fallback.",
      "Optional deep-learning branch with LSTM and GRU sequence models over symptom text.",
      "GitHub Actions pipeline running linting and tests across a Python 3.10–3.12 matrix on every change.",
    ],
    metrics: [
      { value: "83.09%", label: "best model accuracy" },
      { value: "~190K", label: "patient records" },
      { value: "377", label: "symptoms" },
      { value: "727", label: "conditions" },
    ],
    tech: ["Python", "scikit-learn", "FAISS", "sentence-transformers", "Flask", "RAG"],
    github: "https://github.com/mithinsagar/mediXplain-disease-prediction",
    demo: null,
    featured: true,
    coverKey: "medixplain",
    glyph: "MX",
    accent: "blood",
  },
  {
    slug: "aws-ai-resource-cleanup",
    name: "AWS AI Resource Cleanup",
    subtitle: "Automated detection and reclamation of idle cloud resources",
    year: "2026",
    categories: ["Cloud", "Machine Learning"],
    hook: "Idle cloud resources sit unused and forgotten, quietly driving up cost and widening the attack surface.",
    problem:
      "Developers spin up EC2 instances, create EBS snapshots and add IAM users for temporary access, then forget them. Orphaned resources silently inflate the bill and leave unused access points standing.",
    solution:
      "An event-driven Boto3 system scans EC2, EBS, S3, IAM, CloudWatch and RDS against YAML-configurable age and inactivity thresholds, then reclaims what is safe to reclaim on a scheduled Lambda cron. A trained Random Forest predicts keep / review / delete per resource from utilisation metrics, dry-run mode previews every deletion before anything executes, and protected tags guard critical infrastructure from accidental deletes.",
    highlights: [
      "Multi-service scanning across eight AWS resource types with tag-based exclusion.",
      "Statistical outlier detection for cost spikes alongside the classifier.",
      "Flask dashboard for resources, recommendations and reports; PDF and CSV output for audit trails.",
      "Runs locally via cron or deploys as a Lambda triggered by EventBridge, with SNS notifications on completion.",
    ],
    metrics: [
      { value: "8", label: "AWS services scanned" },
      { value: "3", label: "recommendation classes" },
      { value: "ICANDIT", label: "2026 · paper presented" },
    ],
    tech: ["Python", "Boto3", "scikit-learn", "AWS Lambda", "EventBridge", "Flask", "SNS"],
    github: "https://github.com/mithinsagar/aws-ai-resource-cleanup",
    demo: null,
    featured: false,
    glyph: "AWS",
    accent: "ember",
    note: "Developed alongside the ICANDIT 2026 paper.",
  },
  {
    slug: "exai-resumeintel",
    name: "EXAI-ResumeIntel",
    subtitle: "Explainable AI for automated resume analysis",
    year: "2026",
    categories: ["Explainable AI", "Machine Learning"],
    hook: "Automated screening assigns match scores without any rationale — candidates can’t act on them and recruiters can’t audit them.",
    problem:
      "Resume screening systems output a number and nothing else, preventing candidates from understanding which skills to develop and preventing recruiters from auditing shortlisting decisions.",
    solution:
      "A five-layer framework. A hierarchical domain ontology with 346 alias mappings across 22 canonical skill nodes detects implicit skills — a resume listing 'YOLOv8', 'COCO dataset' and 'anchor boxes' is correctly read as carrying computer vision expertise even though neither canonical term appears. TF-IDF with Truncated SVD produces 150-dimensional semantic embeddings, a four-component engine yields an interpretable score, exact Shapley values are independently validated by LIME, and counterfactual what-if explanations quantify the gain from acquiring each missing skill.",
    highlights: [
      "Exact Shapley values satisfying all four game-theoretic axioms, cross-checked by LIME across 300 perturbation samples.",
      "Evaluated on 2,484 real resumes across 24 job categories with 5-fold stratified cross-validation.",
      "Ontological inference alone lifts the Machine Learning Engineer role from a 38% semantic-only baseline to 74%.",
      "Models and dataset published to the Hugging Face Hub alongside a live Space.",
    ],
    metrics: [
      { value: "70.73%", label: "overall accuracy" },
      { value: "100%", label: "SHAP–LIME agreement" },
      { value: "0.993", label: "best ROC-AUC" },
      { value: "2,484", label: "resumes evaluated" },
    ],
    tech: ["Python", "SHAP", "LIME", "scikit-learn", "Truncated SVD", "FastAPI", "Streamlit"],
    github: "https://github.com/mithinsagar/EXAI-ResumeIntel",
    demo: "https://huggingface.co/spaces/mithinsagar/exai-resumeintel",
    demoLabel: "Open the Space",
    featured: false,
    glyph: "EX",
    accent: "rust",
  },
  {
    slug: "xai-attack-defense",
    name: "XAI Attack & Defense",
    subtitle: "Robustness of explanations under adversarial manipulation",
    year: "2026",
    categories: ["Explainable AI", "Machine Learning"],
    hook: "A perturbation can leave a prediction untouched while completely shifting which features the explanation highlights.",
    problem:
      "Phishing, intrusion and fraud detectors are black boxes, and the XAI methods introduced to open them can themselves be attacked. An analyst who trusts a manipulated explanation reaches the wrong conclusion while the model looks correct.",
    solution:
      "A research framework that trains base models across three real security datasets, generates explanations via four XAI methods, executes four families of explanation attacks, and quantifies manipulation with a formal Explanation Drift metric. It then analyses amplified vulnerability under few-shot learning and proposes four progressively stronger defense architectures, culminating in a hybrid defense.",
    highlights: [
      "Four XAI methods — SHAP, LIME, Integrated Gradients and Captum attributions — under four attack families.",
      "A formal Explanation Drift metric that makes manipulation measurable rather than anecdotal.",
      "Few-shot analysis showing where low-data regimes amplify explanation vulnerability.",
      "Hybrid defense reduces explanation drift by up to 91% while preserving prediction accuracy.",
    ],
    metrics: [
      { value: "91%", label: "drift reduction" },
      { value: "246K+", label: "samples" },
      { value: "3", label: "security datasets" },
      { value: "4", label: "defense architectures" },
    ],
    tech: ["PyTorch", "SHAP", "LIME", "Integrated Gradients", "Captum", "NumPy"],
    github: "https://github.com/mithinsagar/xai-attack-defense-framework",
    demo: null,
    featured: false,
    glyph: "XAI",
    accent: "blood",
    note: "Collaborators on the original technical report: Gokul Ram K, Kishore A G.",
  },
  {
    slug: "society-maintenance-tracker",
    name: "Society Maintenance Tracker",
    subtitle: "Complaint lifecycle platform for residential societies",
    year: "2026",
    categories: ["Full-Stack"],
    hook: "Housing societies triage maintenance complaints over paper and chat, so nothing is auditable.",
    problem:
      "Without a system the committee cannot see what is pending or overdue, and residents have no visibility into progress at all.",
    solution:
      "A React/Next.js interface over a typed Node.js REST API of 20+ handlers with a normalised PostgreSQL schema and role-based authentication. Every status transition writes to an append-only event log kept immutable by a database trigger, and resident notifications commit through a transactional outbox so a failed third-party call can never roll one back.",
    highlights: [
      "Triage queue ordered by what actually needs attention — overdue first, then priority, then age.",
      "Immutable audit trail enforced at the database level, not in application code.",
      "Overdue detection derived on read from a runtime-configurable threshold.",
      "Light and dark themes, both designed rather than inverted.",
    ],
    metrics: [
      { value: "20+", label: "API handlers" },
      { value: "81", label: "Vitest tests" },
      { value: "11", label: "complaint categories" },
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Drizzle", "Cloudinary", "Vitest"],
    github: "https://github.com/mithinsagar/society-maintenance-tracker",
    demo: "https://society-maintenance-tracker-two-omega.vercel.app",
    demoLabel: "Open the demo",
    featured: false,
    coverKey: "society-maintenance-tracker",
    glyph: "SM",
    accent: "rust",
  },
  {
    slug: "strider-runner",
    name: "Strider Runner",
    subtitle: "A precision 2D platformer built in Unity",
    year: "2025",
    categories: ["Game"],
    hook: "Tight controls, double jump, air dash, wall grab — movement as the whole design problem.",
    problem:
      "Platformer feel lives or dies on input latency and state transitions that most tutorials paper over.",
    solution:
      "A single-player 2D action platformer with a character roster, each with a distinct movement profile, racing through hand-crafted levels of traps, patrolling enemies and ranged shooters. Built on Unity’s new Input System with ScriptableObject-based character data, a lightweight audio manager and a PlayerPrefs save system — intended as both a playable game and a reference codebase.",
    highlights: [
      "Double jump, air dash, wall grab and wall jump chained into continuous movement.",
      "ScriptableObject character data so a new character is data, not code.",
      "Physics-driven traps, collectibles and checkpoints across a multi-level campaign.",
    ],
    metrics: [
      { value: "4+", label: "hand-built levels" },
      { value: "C#", label: "Unity Input System" },
    ],
    tech: ["Unity", "C#", "Input System", "ScriptableObjects"],
    github: "https://github.com/mithinsagar/StriderRunner-UnityGame",
    demo: null,
    featured: false,
    coverKey: "strider-runner",
    glyph: "SR",
    accent: "ember",
  },
];

export const projectMedia = media.projects as Record<
  string,
  { cover: Media; gallery: Media[] }
>;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function coverFor(p: Project) {
  return p.coverKey ? projectMedia[p.coverKey]?.cover ?? null : null;
}

export function galleryFor(p: Project) {
  return p.coverKey ? projectMedia[p.coverKey]?.gallery ?? [] : [];
}
