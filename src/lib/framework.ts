import type { Medium } from "@/lib/model";

export type Choice = { id: string; label: string; detail?: string };

export type FieldDef = {
  id: string;
  label: string;
  help: string;
  placeholder?: string;
  kind: "short" | "long" | "choice";
  options?: Choice[];
  show?: (answers: Record<string, string>) => boolean;
};

export type Stage = {
  id: string;
  label: string;
  numeral: string;
  title: string;
  guide: string;
  rule: string;
  fields: FieldDef[];
};

export type Phase = {
  id: string;
  name: string;
  intent: string;
  exit: string;
  tasks: { id: string; label: string }[];
};

export type Reminder = { id: string; title: string; body: string };

export type ShelfRow = {
  id: string;
  label: string;
  min: number;
  max: number;
  signal: string;
};

export type PriceRow = {
  id: string;
  label: string;
  expect: string;
  must: string;
};

export const HOUR_CHOICES: Choice[] = [
  {
    id: "u5",
    label: "Under 5 hours a week",
    detail: "A trickle. Only a proof or a short story stays honest here.",
  },
  {
    id: "h10",
    label: "5–10 hours",
    detail: "A real side project, if you protect the hours like a shift.",
  },
  {
    id: "h20",
    label: "11–20 hours",
    detail: "Part-time. A commercial finish is possible if the scope stays locked.",
  },
  {
    id: "h40",
    label: "21–40 hours",
    detail: "Near full-time. You still only get one loop or one book.",
  },
  {
    id: "over",
    label: "Full-time and then some",
    detail: "Time is not the scarce thing. A kill list still is.",
  },
];

export const GAME_BANDS: Choice[] = [
  {
    id: "proof",
    label: "Proof",
    detail:
      "A few days to three weeks. One mechanic. This is a decision about whether the verb is fun — not a product.",
  },
  {
    id: "solo",
    label: "Solo commercial",
    detail:
      "The realistic first paid game. One loop, a few hours or a tight replayable run, a store page, a trailer. Months, not a vague someday.",
  },
  {
    id: "team",
    label: "Small team",
    detail:
      "Only if the other people already said yes. Still one game. Still a kill list. More hands are not permission for five genres.",
  },
  {
    id: "dream",
    label: "The dream version",
    detail: "Write it so you can see it. Do not schedule it. A dream is not a size you can ship.",
  },
];

export const BOOK_BANDS: Choice[] = [
  {
    id: "story",
    label: "Short story",
    detail:
      "1,500–7,500 words. One turn, fully paid. Sellable to magazines and as practice — rarely as a standalone product.",
  },
  {
    id: "novella",
    label: "Novella",
    detail:
      "17,500–40,000 words. A strong shape in horror, SFF, and romance-adjacent work. The band most people can actually finish.",
  },
  {
    id: "novel",
    label: "Single novel",
    detail:
      "One book with a complete arc, inside your shelf's debut length. Series potential is allowed. A series obligation is not.",
  },
  {
    id: "saga",
    label: "The saga",
    detail:
      "The multi-book version in your head. Park it. If you are writing, you are writing one book with its own ending.",
  },
];

export const PRICE_ROWS: PriceRow[] = [
  {
    id: "short",
    label: "$3–8",
    expect: "Under about two hours, or a tiny perfect loop.",
    must: "One sharp verb. No filler systems to justify the file size.",
  },
  {
    id: "indie",
    label: "$10–15",
    expect: "About 3–6 hours, or a run people replay and recommend.",
    must: "A trailer of the verb, and a first fifteen minutes that doesn't need you in the room.",
  },
  {
    id: "full",
    label: "$16–25",
    expect: "A full evening or more, with an ending.",
    must: "Density and polish a stranger can see in the trailer. Length you can prove.",
  },
  {
    id: "free",
    label: "Free or name-your-price",
    expect: "A gift, a demo, or a proof.",
    must: "Don't describe it with the promises of a $20 game.",
  },
];

export const SHELF_ROWS: ShelfRow[] = [
  {
    id: "romance",
    label: "Romance",
    min: 70000,
    max: 90000,
    signal: "Who wants whom, and why it is hard. Not the kingdom.",
  },
  {
    id: "thriller",
    label: "Thriller",
    min: 70000,
    max: 90000,
    signal: "The danger and the clock. The reader should know both early.",
  },
  {
    id: "mystery",
    label: "Mystery",
    min: 70000,
    max: 90000,
    signal: "The question, the sleuth, and a fair answer.",
  },
  {
    id: "ya",
    label: "Young adult",
    min: 60000,
    max: 85000,
    signal: "The age of the want. Not a prologue of history.",
  },
  {
    id: "fantasy",
    label: "Fantasy",
    min: 90000,
    max: 120000,
    signal: "A specific power or wound. A map is not a hook. Past 120k is scope, not epicness.",
  },
  {
    id: "sf",
    label: "Science fiction",
    min: 80000,
    max: 110000,
    signal: "One change in the world, felt by a person.",
  },
  {
    id: "horror",
    label: "Horror",
    min: 70000,
    max: 95000,
    signal: "The dread and the rule of the threat. Novellas sell on this shelf too.",
  },
  {
    id: "literary",
    label: "Literary",
    min: 70000,
    max: 100000,
    signal: "Voice plus trouble, sayable in a sentence.",
  },
  {
    id: "other",
    label: "Cross-shelf",
    min: 70000,
    max: 100000,
    signal: "Name the shelf a bookseller would actually use, then write to that reader.",
  },
];

const EMOTIONS: Choice[] = [
  { id: "mastery", label: "Mastery", detail: "I got better, and I can feel it." },
  { id: "dread", label: "Dread", detail: "I know something is wrong and I go anyway." },
  { id: "wonder", label: "Wonder", detail: "The place is larger than I expected, and I am small in it." },
  { id: "tenderness", label: "Tenderness", detail: "Care is the mechanic, not a cutscene." },
  { id: "comedy", label: "Comedy", detail: "Timing and trouble. The joke is played, not told." },
  { id: "power", label: "Power", detail: "I become dangerous, and it costs something." },
  { id: "mystery", label: "Mystery", detail: "I cannot stop turning the next piece over." },
  { id: "coziness", label: "Coziness", detail: "Safety, ritual, a small place that is mine." },
  { id: "grief", label: "Grief", detail: "Something is already gone. Play is how I carry it." },
  { id: "defiance", label: "Defiance", detail: "The system is bigger. I do the job anyway." },
];

const SERIES: Choice[] = [
  {
    id: "standalone",
    label: "Standalone",
    detail: "The story ends. A reader can be done and satisfied.",
  },
  {
    id: "door",
    label: "Standalone with a door",
    detail: "This book's promise is paid. The world could open later, on purpose.",
  },
  {
    id: "series",
    label: "Book one of a series",
    detail: "Only honest if this volume answers its own question. A cliffhanger is not an ending.",
  },
];

const PATHS: Choice[] = [
  {
    id: "trad",
    label: "Traditional",
    detail: "You need a query letter, a synopsis, and pages. Agents sell a book, not a universe.",
  },
  {
    id: "self",
    label: "Self-published",
    detail: "You are the publisher. That means an editor, a cover, a blurb, categories, and a launch.",
  },
  {
    id: "serial",
    label: "Serial first",
    detail: "The unit is the chapter or episode. You still define what 'this book is done' means.",
  },
];

export const MARKET_LINE: Record<Medium, string> = {
  game: "A stranger understands the verb from the trailer, still has game left after two hours — or paid a short-game price — and reaches an ending or a deliberate stop.",
  book: "A stranger can repeat the problem, the length fits the shelf, the ending pays the premise, and someone who isn't you has edited it.",
};

export const STAGES: Record<Medium, Stage[]> = {
  game: [
    {
      id: "spark",
      label: "Spark",
      numeral: "01",
      title: "Catch it before you enlarge it",
      guide:
        "Write the picture and the sentence. Do not open with the lore, the class list, or the five regions. If the idea cannot survive being small on the page, it will not survive production.",
      rule: "A setting is not a game. The sentence needs a person doing something.",
      fields: [
        {
          id: "pitch",
          label: "The sentence",
          help: "Who does what, where, and the feeling. One or two sentences. If you drift into backstory, stop and cut.",
          placeholder:
            "A night courier chooses routes through a city that forgets itself by dawn. It feels like staying competent while the ground changes.",
          kind: "long",
        },
        {
          id: "image",
          label: "The picture you actually had",
          help: "The single scene in your head when the idea hit. Not the trailer you invented afterward.",
          placeholder: "A bicycle under one working streetlamp. The next block is a different year.",
          kind: "long",
        },
        {
          id: "itch",
          label: "What almost scratched it",
          help: "The game that got close and stopped. Name what it didn't give you. That gap is the idea — not 'I will do everything it did, plus more.'",
          placeholder: "I wanted the route to be the whole story, and every game I love turns the route into a menu.",
          kind: "long",
        },
      ],
    },
    {
      id: "promise",
      label: "Promise",
      numeral: "02",
      title: "Say what a stranger is buying",
      guide:
        "The promise is the feeling the player performs, plus the shelf it sits on. Comps are how you find that shelf. Take one thing from each and refuse the rest, or you will build a collage with no store page.",
      rule: "If you need a paragraph to explain it, you do not have a hook yet.",
      fields: [
        {
          id: "fantasy",
          label: "Player fantasy",
          help: "The identity they get to perform. 'Be a hero' is not specific enough to cut features with.",
          placeholder: "Be a small, competent worker in a place that keeps rewriting itself.",
          kind: "short",
        },
        {
          id: "emotion",
          label: "The emotion you are selling",
          help: "Pick the one a ten-minute session should leave behind. The others can appear. They don't get systems.",
          kind: "choice",
          options: EMOTIONS,
        },
        {
          id: "eightWords",
          label: "Eight-word hook",
          help: "The line a capsule and a trailer can carry. Count the words. If it is clever but unclear, it fails.",
          placeholder: "Deliver the dawn before the city forgets you",
          kind: "short",
        },
        {
          id: "notThis",
          label: "What this is not",
          help: "Name the genres and features you are refusing. This sentence is a lock. Future-you will try to pick it.",
          placeholder: "Not an open-world RPG. Not a crafting game. Not multiplayer. Not a forty-hour campaign.",
          kind: "long",
        },
        {
          id: "comps",
          label: "Three comps",
          help: "Real titles. For each: what you take, and what you refuse. Recent and adjacent beats the famous game you wish you were making.",
          placeholder:
            "Night in the Woods — the town as a character — refuse the hanging-out structure\nDeath Stranding — the route as drama — refuse the scale and the gear bible\nUnpacking — labor as story — refuse pure quiet; this one has pursuit",
          kind: "long",
        },
      ],
    },
    {
      id: "scale",
      label: "Scale",
      numeral: "03",
      title: "Lock a size you can finish",
      guide:
        "Marketable is not the version in your head. It is a finished piece a stranger understands from a trailer, trusts at a price, and can complete. The dream gets written down so it stops leaking into the weeks you actually have.",
      rule: "If you do not know your weekly hours, you do not have a timeline. You have a wish.",
      fields: [
        {
          id: "weeklyHours",
          label: "Hours you will actually protect",
          help: "Not the hours you have in a perfect month. The hours you can repeat in a bad one.",
          kind: "choice",
          options: HOUR_CHOICES,
        },
        {
          id: "sizeBand",
          label: "The band you are producing",
          help: "Proof, solo commercial, or a team that already exists. The dream version is a parking lot, not a plan.",
          kind: "choice",
          options: GAME_BANDS,
        },
        {
          id: "whoBuilds",
          label: "Who already said yes",
          help: "Names and roles. 'I might find an artist' is not a team. If the list is only you, change the band.",
          placeholder: "Me: design and code. Rin: environments, ten hours a week, already agreed.",
          kind: "long",
          show: (answers) => answers.sizeBand === "team",
        },
        {
          id: "horizon",
          label: "Two dates",
          help: "A near date for the slice, and a later date for done. Ranges are fine. 'Someday' is not a date.",
          placeholder: "Playable slice in 12 weeks. Release candidate in 9 months.",
          kind: "short",
        },
        {
          id: "honestWhy",
          label: "Why this band, not the dream",
          help: "Write the constraint in plain language. Hours, skill, money, or the fact you have never finished one.",
          placeholder:
            "I have evenings and no one else. The five-district version is a second game. This one has to prove I can ship.",
          kind: "long",
        },
      ],
    },
    {
      id: "concept",
      label: "Concept",
      numeral: "04",
      title: "Three pillars and one verb",
      guide:
        "Pillars are the only legal reason for a feature to exist. The verb is what the hands do every thirty seconds. Tone is not a pillar. Immersion is not a verb.",
      rule: "Every feature serves a pillar, or it is cut. There is no third category.",
      fields: [
        {
          id: "pillars",
          label: "Three pillars",
          help: "One per line. Exactly three. If a feature serves none of them, it does not go in the build.",
          placeholder:
            "The route is the puzzle\nThe city is unstable, not huge\nYou are a worker, not a chosen one",
          kind: "long",
        },
        {
          id: "verb",
          label: "The thirty-second verb",
          help: "Plain actions. No proper nouns required. If a stranger can't picture their hands, it isn't a verb yet.",
          placeholder: "Read the street, pick a turn, time the delivery, escape when the block collapses.",
          kind: "long",
        },
        {
          id: "session",
          label: "A twenty-minute session",
          help: "What starts, what gets harder, what a player has at the end that they didn't have at the start.",
          placeholder: "Three stops, one street that wasn't there yesterday, a dawn you barely make.",
          kind: "long",
        },
        {
          id: "failure",
          label: "How they fail",
          help: "Failure should teach the verb. If failure is only a game-over screen, you don't know the toy yet.",
          placeholder: "You miss the dawn and the district forgets the delivery. You keep the knowledge of the route.",
          kind: "long",
        },
        {
          id: "tone",
          label: "Tone in references, not adjectives",
          help: "Two or three works, and the specific quality. 'Dark and cinematic' is not a production note.",
          placeholder: "The quiet labor of Unpacking, the civic melancholy of Night in the Woods.",
          kind: "short",
        },
      ],
    },
    {
      id: "spine",
      label: "Spine",
      numeral: "05",
      title: "The slice, not the saga",
      guide:
        "Describe the loop at four sizes, then the one chunk you will finish to shipping quality. That chunk is the vertical slice. It is not a grey prototype of every system you hope to have someday.",
      rule: "After the slice starts, new systems are scope. Content uses what the slice already proved.",
      fields: [
        {
          id: "loopLayers",
          label: "Four sizes of the loop",
          help: "Moment, minute, session, and why they come back tomorrow. If you can't fill the first two, stop and return to the verb.",
          placeholder:
            "Moment: choose a street and commit.\nMinute: complete or lose a delivery.\nSession: change the district and reach dawn.\nReturn: tomorrow's streets are not these streets.",
          kind: "long",
        },
        {
          id: "slice",
          label: "The vertical slice",
          help: "One level or one run. Final-feel controls. A consistent look, even if simple. A success and a failure. A person who doesn't know you can tell what it is.",
          placeholder:
            "One district, three deliveries, finished bike and lamplight, one collapse, a dawn ending. No other regions exist.",
          kind: "long",
        },
        {
          id: "onboarding",
          label: "The first sixty seconds",
          help: "What the player does, not what a text box says. If it requires a lecture, the verb is too complicated for this band.",
          placeholder: "They are already on the bike. The first delivery is the tutorial. The street tells them when they are late.",
          kind: "long",
        },
      ],
    },
    {
      id: "market",
      label: "Market",
      numeral: "06",
      title: "Define the thing someone pays for",
      guide:
        "Price is a promise about length and polish. The store page has to sell the verb without you explaining it in the comments. Write that proof now, while it can still change the scope.",
      rule: "If the trailer cannot show it in five seconds, it is not the game.",
      fields: [
        {
          id: "audience",
          label: "Who already pays for something adjacent",
          help: "A real reader of a real shelf. 'People who like good games' is not a person.",
          placeholder:
            "Players who finish small narrative indies and atmospheric stealth, and who will buy a short game if the trailer is clear.",
          kind: "long",
        },
        {
          id: "price",
          label: "Price band",
          help: "This chooses your length. Do not pick the price of the dream and the content of a weekend.",
          kind: "choice",
          options: PRICE_ROWS.map((row) => ({
            id: row.id,
            label: row.label,
            detail: row.expect,
          })),
        },
        {
          id: "platform",
          label: "Where it is sold",
          help: "Name the store you will actually ship to first. 'Everywhere' is a porting plan you do not have.",
          placeholder: "Steam, with a small itch demo of the slice.",
          kind: "short",
        },
        {
          id: "refundTest",
          label: "After two hours, what is left?",
          help: "Steam's refund window is two hours. Either something meaningful remains, or you priced this as a short game on purpose.",
          placeholder:
            "At $12 the district is still changing and the third delivery hasn't opened. A two-hour player has not seen the dawn ending.",
          kind: "long",
        },
        {
          id: "storeProof",
          label: "Capsule, trailer, first minute",
          help: "What each one must show. All three should be the verb. Lore screenshots do not convert.",
          placeholder:
            "Capsule: bike, one lamp, a street ending in fog. Trailer opens on a turn that saves the delivery. First minute is the first delivery, no menu essay.",
          kind: "long",
        },
        {
          id: "whyCompsSold",
          label: "Why those comps worked as products",
          help: "Not why you love them. Why a stranger paid. Steal that clarity, not their feature list.",
          placeholder:
            "They were legible in one image and finished. None of them asked the player to learn five systems before the fantasy arrived.",
          kind: "long",
        },
      ],
    },
    {
      id: "roadmap",
      label: "Roadmap",
      numeral: "07",
      title: "Phases end when something is true",
      guide:
        "A roadmap made of moods will not stop you. Each phase has an exit. You do not start the next one because you are bored or inspired. You start it because the exit is true.",
      rule: "Later phases are fiction until Lock is honest.",
      fields: [],
    },
    {
      id: "reminders",
      label: "Reminders",
      numeral: "08",
      title: "Read this before you add scope",
      guide:
        "These are the sentences to put between an exciting idea and a calendar. When you want to add something, use the scope check at the bottom of the desk. Do not negotiate with yourself in your head. That negotiation always says yes.",
      rule: "The dream list is how you stay ambitious without lying.",
      fields: [],
    },
  ],
  book: [
    {
      id: "spark",
      label: "Spark",
      numeral: "01",
      title: "The image, not the cosmology",
      guide:
        "Write the scene or the question that will not leave. Not the magic system. Not the map. If you start with the encyclopedia, you are delaying the book and calling it planning.",
      rule: "If it does not change a scene, it is not in this book yet.",
      fields: [
        {
          id: "image",
          label: "The image or question",
          help: "One picture, or one question you cannot answer cheaply. This is the seed. Resist adding a second continent.",
          placeholder: "A house grows a mouth in the cellar wall, and it is editing the woman who feeds it papers.",
          kind: "long",
        },
        {
          id: "itch",
          label: "The book you wanted and could not find",
          help: "Name what the nearby books don't do. That absence is the project. 'Like those, but a seven-book saga' is the trap.",
          placeholder: "Gothic houses that are actually about appetite and records, at novella length, with one narrator.",
          kind: "long",
        },
        {
          id: "aftertaste",
          label: "The aftertaste",
          help: "What should remain an hour after the last page. A feeling, not a twist.",
          placeholder: "The relief and grief of choosing a smaller, truer story.",
          kind: "short",
        },
      ],
    },
    {
      id: "promise",
      label: "Promise",
      numeral: "02",
      title: "A person, a want, a cost",
      guide:
        "The premise is a machine: inciting trouble, a goal, stakes, and opposition. The want is external. The need argues with it. Comps tell you which shelf already understands that machine.",
      rule: "A stranger should be able to repeat the problem after two sentences.",
      fields: [
        {
          id: "premise",
          label: "Premise",
          help: "When [inciting], [name] must [goal] or else [stakes], but [opposition]. If a slot is empty, the premise is still a mood.",
          placeholder:
            "When the house grows a second mouth, archivist Inez must feed it the family papers or lose the only record of who she is — but the mouth is rewriting her as she feeds it.",
          kind: "long",
        },
        {
          id: "want",
          label: "External want",
          help: "What they are trying to get or stop, sayable by a stranger. Visible in the plot.",
          placeholder: "Preserve a true record of her family.",
          kind: "short",
        },
        {
          id: "need",
          label: "Internal need",
          help: "What they must become or release. It should cost the want, or the ending has nothing to turn on.",
          placeholder: "Stop defining herself as the family's archivist.",
          kind: "short",
        },
        {
          id: "logline",
          label: "Jacket line",
          help: "Two sentences that sell the problem. Not the history of the house. Not the theme word.",
          placeholder:
            "Inez is the last person who knows which papers are true. The house will keep her that way only if she lets it edit her.",
          kind: "long",
        },
        {
          id: "notThis",
          label: "What this is not",
          help: "The series, the extra POVs, the romance, the lexicon. Write the refusals while you still mean them.",
          placeholder: "Not a trilogy. Not six points of view. Not a constructed language. Not a romance.",
          kind: "long",
        },
        {
          id: "comps",
          label: "Three comps from the living shelf",
          help: "Books a current reader of your genre has actually finished. Classics can be loves. They are bad comps. For each: what you take, what you refuse.",
          placeholder:
            "Mexican Gothic — the house as appetite — refuse the larger cast\nOur Wives Under the Sea — intimacy and dread — refuse the second timeline\nWhat Feasts at Night — the novella as the whole product — refuse the cozy tone",
          kind: "long",
        },
      ],
    },
    {
      id: "scale",
      label: "Scale",
      numeral: "03",
      title: "One book is the product",
      guide:
        "Sagas are how novels escape the calendar. Pick the length that fits your hours and your shelf. Even if you dream of seven volumes, this one pays its own ending.",
      rule: "Word count is a scope lock. 'However long it needs' is not a number.",
      fields: [
        {
          id: "weeklyHours",
          label: "Hours you will actually protect",
          help: "Writing hours, not 'thinking about the book' hours. Research counts only until its end date.",
          kind: "choice",
          options: HOUR_CHOICES,
        },
        {
          id: "sizeBand",
          label: "The band you are finishing",
          help: "Story, novella, or one novel. The saga is not a unit you can sell first.",
          kind: "choice",
          options: BOOK_BANDS,
        },
        {
          id: "wordTarget",
          label: "Word target",
          help: "A number inside the band. The desk will tell you if it fights the shelf.",
          placeholder: "32000",
          kind: "short",
        },
        {
          id: "seriesStance",
          label: "What happens after the last page",
          help: "Standalone is a complete product. A door is a complete product with air in it. A series still owes this volume an ending.",
          kind: "choice",
          options: SERIES,
        },
        {
          id: "bookOnePays",
          label: "The question this volume answers completely",
          help: "Not the question of the whole saga. The one a reader of only this book is owed.",
          placeholder: "Can Inez keep a self that isn't the archive — and what does that cost the record?",
          kind: "long",
          show: (answers) => answers.seriesStance === "series",
        },
        {
          id: "horizon",
          label: "Two dates",
          help: "A date for the end of the zero draft, and a later date for a version someone else can read.",
          placeholder: "Ugly draft in 16 weeks. Beta-ready in 9 months.",
          kind: "short",
        },
        {
          id: "honestWhy",
          label: "Why this length, not the saga",
          help: "Name the real constraint. Unfinished drafts count as a constraint.",
          placeholder:
            "I have never finished a book. A novella is the largest thing I can hold through a revision without inventing a second plot to avoid the ending.",
          kind: "long",
        },
      ],
    },
    {
      id: "concept",
      label: "Concept",
      numeral: "04",
      title: "Who it is about, and who stops them",
      guide:
        "Theme is the argument under the plot, not a slogan. Cap the points of view. An opposing force with a want of its own will do more than another pass of worldbuilding.",
      rule: "A new point of view is a new book until you can say why this one needs it.",
      fields: [
        {
          id: "about",
          label: "What it is about underneath",
          help: "An argument, not a topic. 'Grief' is a topic. 'A true record can still be a cage' is an argument.",
          placeholder: "Keeping the record can be how you refuse to have a life.",
          kind: "long",
        },
        {
          id: "pov",
          label: "Point of view, tense, and the cap",
          help: "Write the number. 'As many as the story needs' is how a novella becomes a chorus.",
          placeholder: "First person, past, one narrator. No exceptions in this draft.",
          kind: "short",
        },
        {
          id: "protagonist",
          label: "Who they are on the first page",
          help: "Competence, wound, and the want already in motion. Not a biography from childhood unless the first scene needs it.",
          placeholder:
            "Inez can date a paper by touch. She has not introduced herself without the family name in years. She is already sorting the cellar when the mouth speaks.",
          kind: "long",
        },
        {
          id: "opposition",
          label: "What wants the opposite",
          help: "A person or a force with its own goal. Weather and vibes are not opposition unless they make choices.",
          placeholder:
            "The mouth wants a cleaner story than the one that happened. Her brother wants the papers burned so the family can be ordinary.",
          kind: "long",
        },
        {
          id: "tone",
          label: "Tone in references, not adjectives",
          help: "Two books or films, and the exact quality you are taking.",
          placeholder: "The domestic dread of Our Wives Under the Sea. The house-logic of Mexican Gothic, without the expedition.",
          kind: "short",
        },
      ],
    },
    {
      id: "spine",
      label: "Spine",
      numeral: "05",
      title: "Spoil the ending, then build the road",
      guide:
        "Write the ending now. Then the beats that earn it. A chapter is not a container for events. It has a job, which is usually to make the want harder or the need louder.",
      rule: "Outline enough not to get lost. Do not outline so long that you never draft.",
      fields: [
        {
          id: "ending",
          label: "The ending, spoiled",
          help: "What happens, and what it means for the want and the need. If you are protecting the surprise from yourself, you are not planning.",
          placeholder:
            "She burns the last true page to starve the mouth, and writes a new first line that is only hers. The house remains. The record does not. She loses the want and pays the need.",
          kind: "long",
        },
        {
          id: "beats",
          label: "Eight to twelve beats",
          help: "From the opening to that ending. Each beat is a turn, not a chapter title full of lore.",
          placeholder:
            "1. She finds the mouth while filing her mother's letters.\n2. Feeding it restores a page she had forgotten.\n3. The brother arrives to burn the archive.\n4. She hides the truest papers and feeds it lies.\n5. The lies start appearing in her own memory.\n6. ...",
          kind: "long",
        },
        {
          id: "subplots",
          label: "How each side thread pressures the want",
          help: "If you cannot name the pressure, the thread is a cut. One sentence per thread.",
          placeholder:
            "The brother — he offers the ordinary life she needs, and the destruction of the want.\nThe house rules — every feeding makes the want easier and the self thinner.",
          kind: "long",
        },
        {
          id: "openingJob",
          label: "The job of the opening",
          help: "Not the prose. The job: want visible, trouble started, voice established. World history is not a job.",
          placeholder:
            "By the end of the first chapter the mouth has eaten one true page and she has chosen to bring it another.",
          kind: "long",
        },
        {
          id: "chapterJob",
          label: "What a chapter must do",
          help: "A rule you can use in revision to cut. If a chapter doesn't do this, it goes.",
          placeholder: "Change what she is willing to feed it, or change what she can still remember.",
          kind: "short",
        },
      ],
    },
    {
      id: "market",
      label: "Market",
      numeral: "06",
      title: "The shelf, the path, the package",
      guide:
        "Marketable means a reader, a length, and a stack of real artifacts. Traditional needs a query packet. Self-publishing needs an editor, a cover that matches the shelf, and a blurb. Serial still needs a definition of done.",
      rule: "The blurb sells the problem. Lore is what they get after they care.",
      fields: [
        {
          id: "shelf",
          label: "Bookstore shelf",
          help: "Where a bookseller files it. If you are writing a story or novella, the scale-gate length wins — the shelf still decides the cover and the comps.",
          kind: "choice",
          options: SHELF_ROWS.map((row) => ({
            id: row.id,
            label: row.label,
            detail: `${row.min / 1000}–${row.max / 1000}k as a novel. ${row.signal}`,
          })),
        },
        {
          id: "audience",
          label: "The reader who already finished three books",
          help: "Name the appetite, not the demographic. Who is hungry and what did they just close?",
          placeholder:
            "Readers who finish slim gothic and literary horror and want dread with a complete ending, not a setup for book two.",
          kind: "long",
        },
        {
          id: "path",
          label: "Path to a reader",
          help: "Each path has a different definition of done. Pick one for this book. You can change later — you cannot ship all three at once.",
          kind: "choice",
          options: PATHS,
        },
        {
          id: "package",
          label: "The package 'done' includes",
          help: "List the artifacts, not the feeling of being done. If self-pub: dev edit, line edit, proof, cover, blurb, categories, sample. If trad: letter, synopsis, pages.",
          placeholder:
            "Developmental edit, line edit, proof. Cover that signals gothic novella, not epic fantasy. Blurb of the problem. Categories and three keywords. A first-chapter sample that reaches the second feeding.",
          kind: "long",
        },
        {
          id: "hookTest",
          label: "The first ten percent",
          help: "What has happened by the end of the sample a shopper reads? If the answer is 'the world is introduced,' the sample will not sell the book.",
          placeholder:
            "She has fed the mouth once, seen her memory change, and decided to go back downstairs. The brother has not arrived yet. The want is already in danger.",
          kind: "long",
        },
      ],
    },
    {
      id: "roadmap",
      label: "Roadmap",
      numeral: "07",
      title: "Phases end when something is true",
      guide:
        "Drafting is one phase, not the whole plan. Revision is not 'read it again.' Each phase below has an exit. You leave it when the exit is true, including the phases that are less fun than inventing lore.",
      rule: "You cannot line-edit your way out of a missing ending.",
      fields: [],
    },
    {
      id: "reminders",
      label: "Reminders",
      numeral: "08",
      title: "Read this before you add a thread",
      guide:
        "These are the sentences to put between a new subplot and the manuscript. When you want to add a POV, a country, or a book two, use the scope check. The encyclopedia can be loved and still be a delay.",
      rule: "Pages are the only progress that counts as pages.",
      fields: [],
    },
  ],
};

export const REQUIRED: Record<Medium, Record<string, string[]>> = {
  game: {
    spark: ["pitch"],
    promise: ["fantasy", "eightWords", "comps"],
    scale: ["weeklyHours", "sizeBand", "honestWhy"],
    concept: ["pillars", "verb"],
    spine: ["loopLayers", "slice"],
    market: ["audience", "price", "refundTest", "storeProof"],
  },
  book: {
    spark: ["image"],
    promise: ["premise", "want", "need", "comps"],
    scale: ["weeklyHours", "sizeBand", "wordTarget", "seriesStance"],
    concept: ["protagonist", "opposition"],
    spine: ["ending", "beats"],
    market: ["shelf", "path", "package", "audience"],
  },
};

export const PHASES: Record<Medium, Phase[]> = {
  game: [
    {
      id: "lock",
      name: "Lock",
      intent: "Stop the idea from growing while you pretend to start.",
      exit: "You can explain the game in thirty seconds and name what you are not building.",
      tasks: [
        { id: "sentence", label: "Say the one-sentence pitch out loud to someone who will not be polite." },
        { id: "band", label: "Pick a finishable size band and your real weekly hours." },
        { id: "pillars", label: "Write three pillars. Not five." },
        { id: "park", label: "Move everything that is not those pillars onto the dream list." },
        { id: "cuts", label: "Write at least three cuts, each with a reason." },
      ],
    },
    {
      id: "verb",
      name: "Prove the verb",
      intent: "Find out if the action is fun before you decorate it.",
      exit: "You would play the greybox for ten minutes with no story on screen.",
      tasks: [
        { id: "greybox", label: "Build the verb ugly. No story required." },
        { id: "ten", label: "Play it for ten minutes. If you stop early, the verb is not ready." },
        { id: "inputs", label: "Remove any input that is not the fantasy." },
        { id: "clip", label: "Capture twenty seconds of only the action." },
      ],
    },
    {
      id: "slice",
      name: "Vertical slice",
      intent: "One piece of the finished game, not a tour of future systems.",
      exit: "A stranger knows what they do from thirty seconds of footage.",
      tasks: [
        { id: "level", label: "One level or one run, with the final feel of the controls." },
        { id: "art", label: "Art direction is consistent, even if the style is simple." },
        { id: "stranger", label: "Someone who doesn't know you can tell what the game is." },
        { id: "both", label: "Failure and success both exist in the slice." },
      ],
    },
    {
      id: "content",
      name: "Length",
      intent: "Reach the playtime your price promised. No new toys.",
      exit: "Playtime matches the price band, and there is an ending or a clean stop.",
      tasks: [
        { id: "nosys", label: "Add content only. No new systems." },
        { id: "length", label: "Playtime matches the price band you locked." },
        { id: "end", label: "There is an ending, or a deliberate place the loop stops." },
        { id: "first", label: "The first minute teaches by play, not a lecture." },
      ],
    },
    {
      id: "production",
      name: "Production",
      intent: "Make it survivable by a cold player.",
      exit: "Someone finishes a session without you in the room, and blocker bugs are gone.",
      tasks: [
        { id: "save", label: "The player can stop and continue without losing the session." },
        { id: "audio", label: "The verb has sound that sells the feel." },
        { id: "cold", label: "A cold player finishes a session without you watching." },
        { id: "read", label: "Goals and text are readable at a glance." },
        { id: "bugs", label: "Blocker bugs are gone. The rest are written down." },
      ],
    },
    {
      id: "release",
      name: "Release",
      intent: "Sell the game you made, not the one you meant.",
      exit: "The store page converts without you explaining it in the comments.",
      tasks: [
        { id: "capsule", label: "Capsule art reads at thumbnail size." },
        { id: "trailer", label: "The trailer shows the verb in the first five seconds." },
        { id: "page", label: "The store page says the same thing as the eight-word hook." },
        { id: "price", label: "The price matches the length." },
        { id: "week", label: "Launch week is a written list, not a mood." },
      ],
    },
  ],
  book: [
    {
      id: "lock",
      name: "Lock",
      intent: "Know the book you are finishing before the draft invents a second one.",
      exit: "Premise, ending, length, and comps all describe the same book.",
      tasks: [
        { id: "premise", label: "Write the premise with a want, stakes, and opposition." },
        { id: "end", label: "Spoil the ending in one paragraph." },
        { id: "size", label: "Pick the band and a word target inside it." },
        { id: "alone", label: "Decide how this book ends even if the world could continue." },
        { id: "comps", label: "Name three books a current reader of your shelf would know." },
      ],
    },
    {
      id: "spine",
      name: "Spine",
      intent: "A road from the opening to the ending you already wrote.",
      exit: "You can say what each quarter does to the want.",
      tasks: [
        { id: "beats", label: "Write 8–12 beats from the opening to that ending." },
        { id: "pressure", label: "Every subplot pressures the main want, or it is cut." },
        { id: "pov", label: "Cap the point-of-view count and write the number down." },
        { id: "job", label: "Define the opening's job. Not the prose." },
      ],
    },
    {
      id: "draft",
      name: "Zero draft",
      intent: "Produce pages. Permission to be bad. No permission to add a saga.",
      exit: "A complete draft exists, including the middle and the ending you locked.",
      tasks: [
        { id: "quota", label: "Set a weekly quota from your real hours, not a fantasy streak." },
        { id: "freeze", label: "No new subplot after the first quarter of the draft." },
        { id: "research", label: "Put an end date on research and keep it." },
        { id: "middle", label: "Draft the middle on purpose, before you polish the opening again." },
      ],
    },
    {
      id: "structure",
      name: "Structure revision",
      intent: "Make the book the premise you sold to yourself.",
      exit: "Scenes turn, the quarters escalate, and the ending pays the locked premise.",
      tasks: [
        { id: "read", label: "Read for want and stakes only. Ignore sentences." },
        { id: "scenes", label: "Cut scenes that do not turn." },
        { id: "climb", label: "Each quarter is harder than the one before." },
        { id: "pays", label: "The ending pays the premise you locked, not a new one you discovered." },
      ],
    },
    {
      id: "line",
      name: "Scene and line",
      intent: "Only now is prose the job.",
      exit: "Behavior matches the need, and someone else is scheduled to read it with questions.",
      tasks: [
        { id: "need", label: "Behavior matches the inner need, not just the plot." },
        { id: "talk", label: "Dialogue has a job in the scene." },
        { id: "order", label: "Line edit only after the structure is stable." },
        { id: "betas", label: "Write the questions readers must answer. Not 'any thoughts?'" },
      ],
    },
    {
      id: "package",
      name: "Package",
      intent: "Turn a manuscript into something a stranger can buy or request.",
      exit: "The path you chose has its artifacts, and you are not the only editor.",
      tasks: [
        { id: "path", label: "Follow the checklist for the path you chose." },
        { id: "blurb", label: "The blurb sells the problem, not the lore." },
        { id: "length", label: "The word count is inside the shelf's band." },
        { id: "eyes", label: "Someone who is not you is scheduled to edit." },
        {
          id: "packet",
          label: "Trad: query, synopsis, pages. Self-pub: cover, categories, sample. Serial: what 'done' means.",
        },
      ],
    },
  ],
};

export const REMINDERS: Record<Medium, Reminder[]> = {
  game: [
    {
      id: "sentence",
      title: "The sentence before the system",
      body: "If you cannot say what the player does in one breath, you are designing a setting. Settings do not sell. Verbs do.",
    },
    {
      id: "verb",
      title: "One verb",
      body: "Mastery of one action beats a pile of shallow ones. Players pay for a feeling they can perform.",
    },
    {
      id: "dream",
      title: "The dream list is not a graveyard",
      body: "Write the large version down so it stops leaking into the build. Ambition stays. It just doesn't get a sprint.",
    },
    {
      id: "lore",
      title: "Story will not save a dull verb",
      body: "If the greybox isn't fun for ten minutes, more lore is hiding. Fix the action, or kill the project while it is still cheap.",
    },
    {
      id: "while",
      title: "While I'm at it",
      body: "That sentence adds a year. New systems go through the scope check. Content for a system you already have can go on the ship list.",
    },
    {
      id: "art",
      title: "Style is a budget",
      body: "A look you cannot finish is a different game than the one you pitched. Choose a style the people who exist can complete.",
    },
    {
      id: "five",
      title: "Five games in a trench coat",
      body: "Multiplayer, crafting, base-building, a procedural world, and a branching epic are five projects. The fantasy is one of them.",
    },
    {
      id: "slice",
      title: "The slice is not a prototype of everything",
      body: "It is one piece of the finished game: final-feel controls, a consistent look, a success and a failure. Ugly-but-complete beats pretty-and-partial.",
    },
    {
      id: "page",
      title: "The page has to sell it without you",
      body: "If the capsule and the first minute need a comment from you to make sense, it is not marketable yet.",
    },
    {
      id: "pillar",
      title: "If it serves no pillar, it is not a feature",
      body: "It is a hobby inside your hobby. Pillars exist so you have a polite no.",
    },
  ],
  book: [
    {
      id: "pages",
      title: "Worldbuilding is not pages",
      body: "Notes feel like progress. Only the manuscript is progress. Give research an end date, then write the scene.",
    },
    {
      id: "bible",
      title: "A series bible is not chapter one",
      body: "You can love a seven-book future. You still have to finish one book. The bible can live on the dream list.",
    },
    {
      id: "spoil",
      title: "Spoil your ending",
      body: "Mystery is for the reader. If you don't know the ending, you will write toward more pages instead of toward a point.",
    },
    {
      id: "subplot",
      title: "Every subplot pays rent",
      body: "It makes the main want harder or clearer, or it is a second book hiding in the first.",
    },
    {
      id: "comps",
      title: "Comps are a shelf, not an insult",
      body: "Name recent books a real reader finished. 'Like nothing else' usually means you don't know who would buy it.",
    },
    {
      id: "length",
      title: "Length is a scope choice",
      body: "A debut past the shelf's band has to earn every scene twice. Cut in the plan. Don't discover the cut in year three.",
    },
    {
      id: "want",
      title: "The want by the end of the opening",
      body: "A stranger should be able to say what the protagonist is trying to get. Atmosphere does not substitute.",
    },
    {
      id: "editorder",
      title: "You cannot line-edit a structural hole",
      body: "Structure first, then scenes, then sentences. Polishing chapter one is the most elegant way to avoid the middle.",
    },
    {
      id: "cliff",
      title: "A cliffhanger is not an ending",
      body: "This book owes a complete emotional payment. The world may continue. The promise of this volume may not stay open.",
    },
    {
      id: "eyes",
      title: "You are not the only editor",
      body: "Rereading is not an edit. Marketable prose has had another pair of eyes, and a blurb that sells the problem rather than the lore.",
    },
  ],
};

const STAGE_REMINDER: Record<Medium, Record<string, string>> = {
  game: {
    spark: "sentence",
    promise: "page",
    scale: "dream",
    concept: "verb",
    spine: "slice",
    market: "page",
    roadmap: "while",
    reminders: "pillar",
  },
  book: {
    spark: "pages",
    promise: "want",
    scale: "bible",
    concept: "want",
    spine: "spoil",
    market: "comps",
    roadmap: "editorder",
    reminders: "eyes",
  },
};

export function taskKey(phaseId: string, taskId: string): string {
  return `${phaseId}:${taskId}`;
}

export function stageById(medium: Medium, id: string): Stage {
  const stage = STAGES[medium].find((item) => item.id === id);
  if (!stage) return STAGES[medium][0];
  return stage;
}

export function fieldById(medium: Medium, id: string): FieldDef | undefined {
  for (const stage of STAGES[medium]) {
    const field = stage.fields.find((item) => item.id === id);
    if (field) return field;
  }
  return undefined;
}

export function optionLabel(medium: Medium, fieldId: string, value: string | undefined): string {
  if (!value) return "";
  const field = fieldById(medium, fieldId);
  return field?.options?.find((option) => option.id === value)?.label ?? "";
}

export function reminderFor(medium: Medium, stageId: string): Reminder {
  const id = STAGE_REMINDER[medium][stageId] ?? REMINDERS[medium][0].id;
  return REMINDERS[medium].find((item) => item.id === id) ?? REMINDERS[medium][0];
}

export function requiredIds(medium: Medium, stageId: string, answers: Record<string, string>): string[] {
  const ids = [...(REQUIRED[medium][stageId] ?? [])];
  if (medium === "game" && stageId === "scale" && answers.sizeBand === "team") ids.push("whoBuilds");
  if (medium === "book" && stageId === "scale" && answers.seriesStance === "series") ids.push("bookOnePays");
  return ids;
}

export const LIST_COPY: Record<Medium, { ship: string; shipHelp: string; dream: string; dreamHelp: string }> = {
  game: {
    ship: "In the build",
    shipHelp: "Systems and content you will actually make for this band. If it needs its own trailer, it is probably a second game.",
    dream: "Parked vision",
    dreamHelp: "The rest of the idea. Safe here. Not in the sprint, the slice, or the store page.",
  },
  book: {
    ship: "In this book",
    shipHelp: "Plot threads allowed in this manuscript. Each one should pressure the main want.",
    dream: "Not in this book",
    dreamHelp: "Sequels, extra points of view, lore with no scene. Safe here. Not in the draft.",
  },
};
