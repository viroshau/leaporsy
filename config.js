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
       virtualVantage : (OPTIONAL) set to true to make this a hidden
                  "Virtual Vantage". The tile looks normal on the board,
                  but picking it triggers a splash animation and gives
                  the teams answer priority. Mark ONE clue per category
                  for the classic feel (the host can preview which via
                  DEBUG mode).
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
          question: "This is the term for when a model confidently states something false — inventing a citation, API, or fact that sounds right but isn't.",
          answer: "What is a hallucination? (The reason you always verify an AI's confident-sounding claims.)",
          virtualVantage: true,
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
          question: "This open standard — nicknamed 'USB-C for AI' — lets a model plug into external tools and data sources through one common connector, so it can call functions, search the web, or hit an API instead of only generating text.",
          answer: "What is MCP (the Model Context Protocol)? (One integration standard for tool use / function calling, instead of hand-coding every tool.)",
        },
        {
          question: "Stuffing relevant documents into the prompt so the model answers from your data, not its memory.",
          answer: "What is RAG (Retrieval-Augmented Generation)? (Cheaper and fresher than fine-tuning — the go-to approach for 'chat with our docs,' and a common fix for hallucination.)",
        },
        {
          question: "This is the surrounding software scaffolding — the loop, tool plumbing, memory, and guardrails — that lets a raw model run as an agent, and often lets you swap the underlying LLM in and out easily.",
          answer: "What is an (agent) harness? (The model is the engine; the harness is the rest of the car — model-agnostic ones like opencode let you point the same setup at any LLM.)",
          virtualVantage: true,
        },
        {
          question: "Famously slippery to define, this three-letter milestone marks the point where one AI can do essentially any intellectual task a human can — and labs can't even agree on how we'd know we've reached it.",
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
          virtualVantage: true,
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
          virtualVantage: true,
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
          question: "This many African nations advanced out of the group stages — nearly a clean sweep of the continent's entrants.",
          answer: "What is 9 (out of 10)?",
        },
        {
          question: "This country has appeared in every single men's World Cup since the tournament began in 1930.",
          answer: "What is Brazil? (The only nation to play in all 22 editions.)",
          virtualVantage: true,
        },
        {
          question: "The final will be played at this stadium just outside New York City.",
          answer: "What is MetLife Stadium (East Rutherford, New Jersey)?",
        },
        {
          question: "Name the players tied atop the 2026 World Cup's goal-scoring charts.",
          answer: "Who are Messi, Mbappé, Haaland, and Kane? (The current Golden Boot leaders.)",
        },
      ],
    },
  ],
};

/* Point values per row (top to bottom). */
const POINT_VALUES = [100, 200, 300, 400, 500];
