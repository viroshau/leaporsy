/* ============================================================
   JEOPARDY GAME CONFIG
   ============================================================
   Edit this file to change the game. That's it — no other file
   needs touching.

   Structure:
   - title: shown at the top of the board
   - categories: each with a name and 5 clues (the board grid
     adapts to however many categories you list)
   - Each clue has:
       question : what the host reads / players see
       answer   : revealed when the host clicks "Reveal Answer"
       image    : (OPTIONAL) path or URL to a picture shown with
                  the question — great for "guess what this is"
                  style clues. Put local images in the images/
                  folder, e.g.  image: "images/my-picture.png"
       answerImage : (OPTIONAL) a picture revealed together with
                  the answer — use it for a punchline / big reveal.
   - Point values are automatic: 100, 200, 300, 400, 500
     (row 1 = 100 ... row 5 = 500). Change POINT_VALUES below
     if you want different stakes.

   Note on the AI answers: many include a short "*(...)*" aside
   explaining what the term actually means — read it aloud after
   revealing, so the mixed crowd learns something.
   ============================================================ */

const GAME_CONFIG = {
  title: "MEGA JEOPARDY",

  categories: [
    {
      name: "AI, Defined",
      clues: [
        {
          question: "This San Francisco AI lab created the GPT line of models and kicked off the modern chatbot era with ChatGPT in late 2022.",
          answer: "What is OpenAI?",
        },
        {
          question: "This 2017 architecture — the 'T' in GPT — powers virtually every modern large language model.",
          answer: "What is the Transformer? (It lets the model weigh every word against every other word at once — the architecture under GPT, Claude, and BERT.)",
        },
        {
          question: "Stuffing relevant documents into the prompt so the model answers from your data, not its memory.",
          answer: "What is RAG (Retrieval-Augmented Generation)? (Cheaper and fresher than fine-tuning — the go-to approach for 'chat with our docs.')",
        },
        {
          question: "The catch-all term for training a base model further on your own narrower dataset — to teach it a style, domain, or task.",
          answer: "What is fine-tuning? (The alternative to RAG: you bake the knowledge into the weights instead of feeding it in at question-time.)",
        },
        {
          question: "This landmark 2017 Google paper introduced the Transformer — its punchy six-word title cheekily claims a single mechanism is all you require.",
          answer: "What is 'Attention Is All You Need'? (Its self-attention mechanism lets every token weigh every other token — the breakthrough that made modern LLMs possible.)",
        },
      ],
    },
    {
      name: "Agents & Tools",
      clues: [
        {
          question: "This is the general term for an AI system that can plan, use tools, and take actions autonomously to achieve a goal — not just answer a single prompt.",
          answer: "What is an (AI) agent?",
        },
        {
          question: "Letting a model call external functions — search the web, run code, hit an API — rather than only generating text.",
          answer: "What is tool use (a.k.a. function calling)? (This is what turns a chatbot into something that can actually do things.)",
        },
        {
          question: "The open standard nicknamed 'USB-C for AI' — it lets models plug into tools and data sources through one common connector — abbreviated MCP.",
          answer: "What is the Model Context Protocol? (One integration standard instead of hand-coding every tool.)",
        },
        {
          question: "This is the name for the loop where an agent reasons about what to do, calls a tool, observes the result, and repeats.",
          answer: "What is the ReAct loop (reason + act)?",
        },
        {
          question: "The aspirational milestone where a single AI matches humans across essentially all cognitive tasks — the endgame many agent efforts are chasing.",
          answer: "What is AGI (Artificial General Intelligence)?",
        },
      ],
    },
    {
      name: "Prompt Like a Pro",
      clues: [
        {
          question: "This is the term for the initial hidden instructions that define an AI assistant's behavior before the user says anything.",
          answer: "What is a system prompt?",
        },
        {
          question: "Coding by describing what you want in plain natural language and letting the AI write the actual code.",
          answer: "What is vibe coding? (Term popularized in 2025 — you steer by intent and 'vibes' instead of typing every line.)",
        },
        {
          question: "This is a packaged, reusable bundle of instructions (and sometimes scripts) that an AI agent loads on demand to handle a specialized task — a plug-in playbook you write once and reuse.",
          answer: "What is a skill? (Agent 'skills' teach a model a repeatable procedure once, instead of re-explaining it in every prompt.)",
        },
        {
          question: "Smuggling malicious instructions inside data the model reads — a web page, an email, a PDF — so it obeys the attacker instead of you.",
          answer: "What is prompt injection? (The core security problem for agents and RAG: anything the model reads can try to hijack it.)",
        },
        {
          question: "This is the term for the maximum amount of text (measured in tokens) a model can consider at once.",
          answer: "What is the context window?",
        },
      ],
    },
    {
      name: "Spot the Slop",
      clues: [
        {
          question: "WARM-UP: Every other tile here is obvious AI slop — this 'candid group selfie' is sneakier. Name at least one tell that it was AI-generated.",
          answer: "Look at the hands & fingers (merged / miscounted), the melted laptop keyboard, the garbled 'art' in the wall frames, and the cat's slightly-off paws & face — all classic generative-AI giveaways.",
          image: "images/real-photo.png",
        },
        {
          question: "This mock 'Synthwave.ai' landing page commits the two most notorious AI-default design sins at once — name both. (One word for the color, one word for the fill style.)",
          answer: "What are purple and gradient? (The 'purple gradients everywhere' look is the default aesthetic AI-built sites drift toward — a dead giveaway of machine-generated design.)",
          image: "images/purple-gradients.png",
        },
        {
          question: "This 'Our Services' layout leans on one overused AI-default UI move to make each card 'pop'. Name the design tell. (Hint: look at the edges of the cards.)",
          answer: "What are thick (chunky, colored) borders? (Oversized card borders are a classic AI-generated design crutch.)",
          image: "images/thick-border-cards.png",
        },
        {
          question: "This 'Why Choose Us' feature grid over-does one element on every card — a favorite AI-default flourish. Name the tell.",
          answer: "What are massive (oversized) icons? (Huge icons in rounded squares are a hallmark of AI-generated landing pages.)",
          image: "images/massive-icons.png",
        },
        {
          question: "FINAL SLOP: This glossy 3D character is peak 'Italian brainrot' — a viral genre of AI-generated mascots with absurd fake-Italian names. Name at least one tell that it's AI slop. (Reveal for the punchline.)",
          answer: "Tells: the misspelling ('CAPPUCCIINA' with a double-i), the nonsense mashup names, the too-perfect plastic render, uncanny symmetry. Meet 'Cappuccino Assassino' & 'Ballerina Cappuccina' — a whole AI-slop meme genre.",
          image: "images/cappuccino-question.png",
          answerImage: "images/cappuccino-answer.png",
        },
      ],
    },
    {
      name: "World Cup 2026",
      clues: [
        {
          question: "The 2026 World Cup is co-hosted by these three countries.",
          answer: "What are the USA, Canada, and Mexico?",
        },
        {
          question: "For the first time ever, the tournament has expanded to this many teams.",
          answer: "What is 48? (Up from 32 — 12 groups of four, plus a brand-new Round of 32.)",
        },
        {
          question: "With the 2026 edition, this country becomes the first ever to host the men's World Cup three times.",
          answer: "What is Mexico? (1970, 1986, and 2026.)",
        },
        {
          question: "The final will be played at this stadium just outside New York City.",
          answer: "What is MetLife Stadium (East Rutherford, New Jersey)?",
        },
        {
          question: "The 2026 tournament features this record number of total matches.",
          answer: "What is 104? (Up from 64 in previous editions.)",
        },
      ],
    },
  ],
};

/* Point values per row (top to bottom). */
const POINT_VALUES = [100, 200, 300, 400, 500];
