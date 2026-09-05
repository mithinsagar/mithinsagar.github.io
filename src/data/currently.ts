export const currently = {
  updated: "September 2026",
  blocks: [
    {
      n: "01",
      label: "Building",
      title: "WeldSight and FlashForensics AI",
      body: "Hardening both for real use — baking model weights into the Docker image so a cold start can’t fail on a fetch, and pushing the recovery pipeline’s test coverage into the statistical checks that decide a verdict.",
      tags: ["YOLOv8", "LangGraph", "FastAPI", "Docker"],
    },
    {
      n: "02",
      label: "Learning",
      title: "Agent orchestration that survives production",
      body: "Multi-agent graphs are easy to demo and hard to keep honest. I’m working through state, retries and partial failure — what an agent does when the stage before it returned something almost right.",
      tags: ["LangGraph", "Evaluation", "Tracing"],
    },
    {
      n: "03",
      label: "Exploring",
      title: "Calibration and adversarial explainability",
      body: "Following the thread from MediXplain and the XAI drift work: how far can an explanation be pushed before it stops describing the model, and can the confidence number be trusted at the same time.",
      tags: ["SHAP", "LIME", "Calibration", "Robustness"],
    },
    {
      n: "04",
      label: "Shooting",
      title: "Stage light and street light",
      body: "Still carrying a camera. Concert lighting is the hardest exposure problem I know of that has nothing to do with code, which is exactly why it’s a good break from it.",
      tags: ["Sony", "Live events", "Street"],
    },
  ],

  availability: {
    status: "Open to internships and AI/ML roles",
    detail: "Graduating May 2027 · based in Chennai, open to remote",
  },
};

/**
 * Public-domain verse only — every poem below is out of copyright, quoted in
 * excerpt and attributed. Swap or extend freely.
 */
export type Poem = {
  id: string;
  title: string;
  author: string;
  years: string;
  form: string;
  theme: string;
  lines: string[];
};

export const poems: Poem[] = [
  {
    id: "invictus",
    title: "Invictus",
    author: "William Ernest Henley",
    years: "1888",
    form: "Victorian lyric",
    theme: "Resilience",
    lines: [
      "It matters not how strait the gate,",
      "How charged with punishments the scroll,",
      "I am the master of my fate,",
      "I am the captain of my soul.",
    ],
  },
  {
    id: "o-me-o-life",
    title: "O Me! O Life!",
    author: "Walt Whitman",
    years: "1892",
    form: "Free verse",
    theme: "Purpose",
    lines: [
      "That you are here — that life exists and identity,",
      "That the powerful play goes on, and you may",
      "contribute a verse.",
    ],
  },
  {
    id: "gitanjali-35",
    title: "Where the Mind is Without Fear",
    author: "Rabindranath Tagore",
    years: "Gitanjali, 1912",
    form: "Devotional prose-poem",
    theme: "Freedom",
    lines: [
      "Where the mind is without fear and the head is held high;",
      "Where knowledge is free;",
      "Where the clear stream of reason has not lost its way",
      "into the dreary desert sand of dead habit.",
    ],
  },
  {
    id: "hope",
    title: "“Hope” is the thing with feathers",
    author: "Emily Dickinson",
    years: "c. 1861",
    form: "American lyric",
    theme: "Hope",
    lines: [
      "“Hope” is the thing with feathers —",
      "That perches in the soul —",
      "And sings the tune without the words —",
      "And never stops — at all —",
    ],
  },
  {
    id: "sonnet-43",
    title: "How Do I Love Thee? (Sonnet 43)",
    author: "Elizabeth Barrett Browning",
    years: "1850",
    form: "Sonnet",
    theme: "Love",
    lines: [
      "How do I love thee? Let me count the ways.",
      "I love thee to the depth and breadth and height",
      "My soul can reach, when feeling out of sight",
      "For the ends of being and ideal grace.",
    ],
  },
];

export type Book = {
  id: string;
  title: string;
  author: string;
  tag: string;
  note: string;
};

export const books: Book[] = [
  {
    id: "iml",
    title: "Interpretable Machine Learning",
    author: "Christoph Molnar",
    tag: "Explainability",
    note: "The reference I keep going back to. It is the reason I stopped shipping a score without the evidence behind it.",
  },
  {
    id: "dl",
    title: "Deep Learning",
    author: "Goodfellow, Bengio & Courville",
    tag: "Foundations",
    note: "Slow reading, and the only book that made the maths under a training loop feel inevitable rather than arbitrary.",
  },
  {
    id: "tfs",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    tag: "Judgement",
    note: "Half of model evaluation is really about human bias. This is the book that names the failure modes.",
  },
  {
    id: "pragmatic",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    tag: "Craft",
    note: "Where the habit of making failure have an address came from — small, testable pieces that own one thing each.",
  },
];
