import type { Project } from "@/lib/model";

const DAY = 86_400_000;
const now = 1_762_000_000_000;

function gameTasks(): Record<string, boolean> {
  const done = [
    "lock:sentence",
    "lock:band",
    "lock:pillars",
    "lock:park",
    "lock:cuts",
    "verb:greybox",
    "verb:ten",
  ];
  return Object.fromEntries(done.map((key) => [key, true]));
}

function bookTasks(): Record<string, boolean> {
  const done = ["lock:premise", "lock:end", "lock:size", "lock:alone", "lock:comps", "spine:beats"];
  return Object.fromEntries(done.map((key) => [key, true]));
}

export function exampleProjects(): Project[] {
  return [
    {
      id: "example-ash-courier",
      medium: "game",
      title: "Ash Courier",
      createdAt: now - 40 * DAY,
      updatedAt: now - 2 * DAY,
      example: true,
      stage: "scale",
      answers: {
        pitch:
          "A night courier threads a city that exists only between eleven and dawn, choosing routes while the streets try to forget them.",
        image: "A bicycle under one working streetlamp. The next block is a different year, and the parcel is getting lighter.",
        itch: "I wanted the route itself to be the story. The games I love turn the journey into a menu between the real systems.",
        fantasy: "Be a small, competent worker in a place that keeps rewriting the job.",
        emotion: "defiance",
        eightWords: "Deliver the dawn before the city forgets you",
        notThis:
          "Not an open-world RPG. Not a faction simulator. Not a crafting game. Not multiplayer. Not a forty-hour campaign.",
        comps:
          "Night in the Woods — the town as a character — refuse the hanging-out structure.\nDeath Stranding — the route as drama — refuse the scale and the gear encyclopedia.\nUnpacking — intimate labor as story — refuse pure quiet; this one has pursuit.",
        weeklyHours: "h10",
        sizeBand: "solo",
        horizon: "Vertical slice in 12 weeks. Release candidate in 9 months.",
        honestWhy:
          "I have evenings and no one else. The five-district version is a second game. This one has to prove I can ship a finished thing.",
        pillars:
          "The route is the puzzle\nThe city is unstable, not huge\nYou are a worker, not a chosen one",
        verb: "Read the street, pick a turn, time the delivery, escape when the block starts to forget you.",
        session: "Three stops, one street that was not there yesterday, and a dawn you barely make.",
        failure: "Miss the dawn and the district forgets the delivery. You keep what you learned about the route.",
        tone: "The quiet labor of Unpacking. The civic melancholy of Night in the Woods.",
        loopLayers:
          "Moment: choose a street and commit.\nMinute: complete or lose a delivery.\nSession: change the district and reach dawn.\nReturn: tomorrow's streets are not these streets.",
        slice:
          "One district, three deliveries, finished bike and lamplight, one collapse, a dawn ending. No other regions exist in this build.",
        onboarding:
          "They are already on the bike. The first delivery is the tutorial. The street tells them when they are late. No menu essay.",
        audience:
          "Players who finish small narrative indies and atmospheric stealth, and who will pay for a short game if the trailer is unmistakable.",
        price: "indie",
        platform: "Steam, with an itch demo of the slice.",
        refundTest:
          "At twelve dollars the district is still changing and the third delivery has not opened. A two-hour player has not seen the dawn ending.",
        storeProof:
          "Capsule: bike, one lamp, a street that ends in fog. The trailer opens on a turn that saves the parcel. The first minute is the first delivery.",
        whyCompsSold:
          "They were legible in one image and they finished. None of them asked for five systems before the fantasy arrived.",
      },
      ship: [
        { id: "s1", text: "A bicycle with weight, not a skate" },
        { id: "s2", text: "One hand-authored district that changes overnight" },
        { id: "s3", text: "Three delivery types: fragile, timed, forbidden" },
        { id: "s4", text: "One pursuer, and no combat" },
        { id: "s5", text: "Radio story, not dialogue trees" },
        { id: "s6", text: "A dawn ending" },
      ],
      dream: [
        { id: "d1", text: "Five districts and a city map" },
        { id: "d2", text: "Faction reputation" },
        { id: "d3", text: "Crafted bike parts" },
        { id: "d4", text: "Co-op courier" },
        { id: "d5", text: "A forty-hour branching campaign" },
        { id: "d6", text: "An apartment to decorate" },
      ],
      kills: [
        { id: "k1", what: "Crafting", why: "It never changes the route decision, which is the whole game." },
        { id: "k2", what: "Multiplayer", why: "It doubles production and is not the fantasy of a lone shift." },
        { id: "k3", what: "Dialogue trees", why: "The story is the route and the radio. Choices belong to the street." },
        { id: "k4", what: "A combat system", why: "You escape. Fighting is a different game wearing this coat." },
        { id: "k5", what: "A procedural city", why: "Hand-built instability is the point. Random streets would only be big." },
      ],
      tasks: gameTasks(),
      phaseNotes: {
        lock: "Locked the solo band after I tried to sneak co-op back onto the ship list. It stayed parked.",
      },
    },
    {
      id: "example-second-mouth",
      medium: "book",
      title: "The Second Mouth",
      createdAt: now - 20 * DAY,
      updatedAt: now - DAY,
      example: true,
      stage: "spine",
      answers: {
        image:
          "A house grows a mouth in the cellar wall. It will only tell the truth about the family if the archivist lets it edit her.",
        itch: "Gothic houses that are actually about appetite and records, at a length I can finish, with one narrator.",
        aftertaste: "The relief and grief of choosing a smaller, truer story than the one you were hired to keep.",
        premise:
          "When the house grows a second mouth, archivist Inez must feed it the family papers or lose the only record of who she is — but the mouth is rewriting her as she feeds it.",
        want: "Preserve a true record of her family.",
        need: "Stop defining herself as the family's archivist.",
        logline:
          "Inez is the last person who knows which papers are true. The house will keep her that way only if she lets it edit her.",
        notThis: "Not a trilogy. Not six points of view. Not a constructed language. Not a romance subplot.",
        comps:
          "Mexican Gothic — the house as appetite — refuse the larger cast and the expedition.\nOur Wives Under the Sea — intimacy and dread — refuse a second timeline.\nWhat Feasts at Night — the novella as the whole product — refuse the cozy tone.",
        weeklyHours: "h10",
        sizeBand: "novella",
        wordTarget: "32000",
        seriesStance: "standalone",
        horizon: "Ugly full draft in 16 weeks. A version someone else can read in 9 months.",
        honestWhy:
          "I have never finished a book. A novella is the largest thing I can hold through a revision without inventing a second plot to avoid the ending.",
        about: "Keeping the record can be how you refuse to have a life.",
        pov: "First person, past tense, one narrator. No exceptions in this draft.",
        protagonist:
          "Inez can date a paper by touch. She has not introduced herself without the family name in years. She is already sorting the cellar when the mouth speaks.",
        opposition:
          "The mouth wants a cleaner story than the one that happened. Her brother wants the papers burned so the family can finally be ordinary.",
        tone: "The domestic dread of Our Wives Under the Sea. The house-logic of Mexican Gothic, without the expedition.",
        ending:
          "She burns the last true page to starve the mouth, and writes a new first line that is only hers. The house stays. The record does not. She loses the want and pays the need.",
        beats:
          "1. She finds the mouth while filing her mother's letters.\n2. Feeding it restores a page she had forgotten, and she wants more.\n3. Her brother arrives to burn the archive and offers her a life with no name to keep.\n4. She hides the truest papers and feeds the mouth lies.\n5. The lies start appearing in her own memory.\n6. She tries to stop, and the house withholds the one fact she cannot live without.\n7. She chooses a final feeding that will either save the record or save her.\n8. She burns the last true page. The mouth goes quiet. She writes a sentence that was never in the archive.",
        subplots:
          "The brother — he offers the ordinary life she needs, and the destruction of the want.\nThe house rules — every feeding makes the want easier and the self thinner.",
        openingJob:
          "By the end of the first chapter the mouth has eaten one true page and she has chosen to bring it another.",
        chapterJob: "Change what she is willing to feed it, or change what she can still remember.",
        shelf: "horror",
        audience:
          "Readers who finish slim gothic and literary horror and want dread with a complete ending, not a doorway into book two.",
        path: "self",
        package:
          "Developmental edit, line edit, proof. A cover that signals a gothic novella, not an epic. A blurb of the problem. Categories and keywords. A sample that reaches the second feeding.",
        hookTest:
          "She has fed the mouth once, watched a memory change, and decided to go back downstairs. The want is already in danger before the brother arrives.",
      },
      ship: [
        { id: "s1", text: "Inez and the mouth" },
        { id: "s2", text: "The brother, who wants the record destroyed" },
        { id: "s3", text: "The house's rules, learned only by feeding" },
      ],
      dream: [
        { id: "d1", text: "A city-wide archive conspiracy" },
        { id: "d2", text: "A second house on another coast" },
        { id: "d3", text: "Six points of view across centuries" },
        { id: "d4", text: "A constructed family language, with a glossary" },
        { id: "d5", text: "Books two through seven" },
      ],
      kills: [
        { id: "k1", what: "A glossary of the old language", why: "If it needs a glossary, it is not this novella." },
        {
          id: "k2",
          what: "Flashback chapters",
          why: "The past arrives as paper she feeds, not as scenes we leave the house to live in.",
        },
        { id: "k3", what: "A romance", why: "It would soften the ending and steal pages from the mouth." },
        {
          id: "k4",
          what: "The brother as a second POV",
          why: "He works as pressure she cannot fully see. His chapters would explain him too soon.",
        },
      ],
      tasks: bookTasks(),
      phaseNotes: {
        lock: "The cosmology is on the dream list. I am not allowed to open it during the draft.",
      },
    },
  ];
}
