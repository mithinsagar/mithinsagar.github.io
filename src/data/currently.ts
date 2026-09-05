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
    id: "tao",
    title: "Tao Te Ching",
    author: "Lao Tzu",
    tag: "Stillness",
    note: "Eighty-one short chapters that keep saying the same thing in different ways: the softest thing wears down the hardest, and most of the effort you are spending is the problem.",
  },
  {
    id: "zamm",
    title: "Zen and the Art of Motorcycle Maintenance",
    author: "Robert M. Pirsig",
    tag: "Quality",
    note: "A road trip that turns into an argument about what quality actually is. It is the closest thing I have read to a description of how it feels to care about a thing properly.",
  },
  {
    id: "mamet",
    title: "On Directing Film",
    author: "David Mamet",
    tag: "Craft",
    note: "Brutal about structure. Cut everything that is not the story, then cut again — which turns out to be the same advice whether you are making a film or shipping something.",
  },
  {
    id: "campbell",
    title: "The Hero with a Thousand Faces",
    author: "Joseph Campbell",
    tag: "Myth",
    note: "The shape underneath every story anyone has ever told — the call, the crossing, the return with something you cannot explain to the people who stayed.",
  },
  {
    id: "oliver",
    title: "Selected Poems",
    author: "Mary Oliver",
    tag: "Attention",
    note: "Poems that ask you to look at one thing for longer than is comfortable. Good practice for a habit worth having away from a screen.",
  },
];
