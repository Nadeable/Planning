import {
  LIST_COPY,
  PHASES,
  PRICE_ROWS,
  SHELF_ROWS,
  requiredIds,
  stageById,
  taskKey,
} from "@/lib/framework";
import {
  HOURS,
  filled,
  formatWords,
  linesOf,
  liveKills,
  liveLines,
  parseWords,
  planStarted,
  wordCount,
  type Fill,
  type Project,
} from "@/lib/model";

export type Finding = {
  id: string;
  level: "block" | "warn";
  stage: string;
  title: string;
  detail: string;
};

export type Pace = { text: string; problem: boolean };

export type CheckItem = { id: string; label: string; ok: boolean };

export function shipCap(project: Project): number | null {
  const band = project.answers.sizeBand;
  if (project.medium === "game") {
    if (band === "proof") return 4;
    if (band === "solo") return 7;
    if (band === "team") return 10;
    return null;
  }
  if (band === "story") return 2;
  if (band === "novella") return 3;
  if (band === "novel") return 5;
  return null;
}

export function lengthVerdict(project: Project): { level: "ok" | "warn"; text: string } | null {
  if (project.medium !== "book") return null;
  const words = parseWords(project.answers.wordTarget);
  const band = project.answers.sizeBand;
  if (!words || !band || band === "saga") return null;
  let min = 0;
  let max = 0;
  let name = "";
  if (band === "story") {
    min = 1500;
    max = 7500;
    name = "short story";
  } else if (band === "novella") {
    min = 17500;
    max = 40000;
    name = "novella";
  } else if (band === "novel") {
    const shelf = SHELF_ROWS.find((row) => row.id === project.answers.shelf);
    if (!shelf) {
      return { level: "warn", text: "Pick a shelf so the word target has a band to fit." };
    }
    min = shelf.min;
    max = shelf.max;
    name = `${shelf.label.toLowerCase()} debut`;
  } else {
    return null;
  }
  if (words < min) {
    return {
      level: "warn",
      text: `${formatWords(words)} is under a typical ${name} (${formatWords(min)}–${formatWords(max)}). Short can be right — only if the ending still pays.`,
    };
  }
  if (words > max) {
    return {
      level: "warn",
      text: `${formatWords(words)} is over a typical ${name} (${formatWords(min)}–${formatWords(max)}). Those extra words are scope. Cut them in the plan, not in year three.`,
    };
  }
  return {
    level: "ok",
    text: `${formatWords(words)} sits inside a typical ${name} (${formatWords(min)}–${formatWords(max)}).`,
  };
}

export function paceNote(project: Project): Pace | null {
  const hours = HOURS[project.answers.weeklyHours] ?? 0;
  const band = project.answers.sizeBand;
  if (!hours || !band) return null;
  if (project.medium === "game") {
    if ((band === "solo" || band === "team") && hours <= 4) {
      return {
        problem: true,
        text: "Under five hours a week, a commercial game turns into a multi-year secret. Protect more hours, or drop the band to a proof you will finish.",
      };
    }
    if (band === "proof") {
      return {
        problem: false,
        text: "A proof should be over in days or a few weeks. If you are scheduling a content calendar, it is no longer a proof.",
      };
    }
    if (band === "solo") {
      return {
        problem: false,
        text: "At this pace a solo commercial game is a season to a year of the same loop. The slice comes before more content.",
      };
    }
    if (band === "team") {
      return {
        problem: false,
        text: "Other people only help if they have already agreed and the kill list stays closed. A team is not permission to add modes.",
      };
    }
    return null;
  }
  if (band === "saga") {
    return {
      problem: true,
      text: "A saga is not a schedule. Pick the length of the one book you will finish.",
    };
  }
  const words = parseWords(project.answers.wordTarget);
  if (words) {
    const draftWeeks = Math.max(1, Math.ceil(words / (hours * 400)));
    const total = draftWeeks * 2;
    let extra = "";
    let problem = false;
    if (draftWeeks > 60) {
      problem = true;
      extra = " The draft alone is longer than a year. That is scope, not a character flaw.";
    } else if (hours <= 4 && band === "novel" && words >= 70000) {
      problem = true;
      extra = " At this pace a full novel is hard to hold together. Shrink the band if you need a finish line you can see.";
    }
    return {
      problem,
      text: `About ${formatWords(words)} words at ${hours} hours a week, drafting near 400 words an hour, is roughly ${draftWeeks} weeks of a messy first draft. Revision takes at least that long again — call the whole thing about ${total} weeks.${extra}`,
    };
  }
  if (band === "story") {
    return { problem: false, text: "A short story should reach an ending in weeks, not grow a world bible." };
  }
  if (band === "novella") {
    return {
      problem: false,
      text: "A novella is the band most likely to get finished beside a job. Guard it from becoming a novel.",
    };
  }
  if (band === "novel") {
    return {
      problem: false,
      text: "A novel at this pace is a draft plus a full revision. Do not plan the sequel inside that time.",
    };
  }
  return null;
}

export function priceMust(priceId: string | undefined): string {
  return PRICE_ROWS.find((row) => row.id === priceId)?.must ?? "";
}

export function stageFill(project: Project, stageId: string): Fill {
  if (stageId === "reminders") return "neutral";
  if (stageId === "roadmap") {
    const phase0 = PHASES[project.medium][0];
    const done = phase0.tasks.filter((task) => project.tasks[taskKey(phase0.id, task.id)]).length;
    const anyTask = Object.values(project.tasks).some(Boolean);
    const anyNote = Object.values(project.phaseNotes).some((note) => filled(note));
    if (done === phase0.tasks.length) return "ready";
    if (done > 0 || anyTask || anyNote) return "partial";
    return "empty";
  }
  const stage = stageById(project.medium, stageId);
  if (stage.id !== stageId) return "empty";
  const visible = stage.fields.filter((field) => !field.show || field.show(project.answers));
  const answered = visible.filter((field) => filled(project.answers[field.id]));
  const required = requiredIds(project.medium, stageId, project.answers);
  const ready = required.length > 0 && required.every((id) => filled(project.answers[id]));
  const listTouched =
    stageId === "scale" &&
    liveLines(project.ship).length + liveLines(project.dream).length + liveKills(project.kills).length > 0;
  if (ready) return "ready";
  if (answered.length > 0 || listTouched) return "partial";
  return "empty";
}

export function findings(project: Project): Finding[] {
  if (!planStarted(project)) return [];
  const out: Finding[] = [];
  const answers = project.answers;
  const band = answers.sizeBand ?? "";
  const hours = HOURS[answers.weeklyHours] ?? 0;
  const cap = shipCap(project);
  const shipN = liveLines(project.ship).length;
  const dreamN = liveLines(project.dream).length;
  const killN = liveKills(project.kills).length;
  const productGame = project.medium === "game" && (band === "solo" || band === "team");
  const finishableBook = band === "story" || band === "novella" || band === "novel";
  const productBook = band === "novella" || band === "novel";

  const push = (finding: Finding) => out.push(finding);

  if (project.medium === "game" && !filled(answers.pitch)) {
    push({
      id: "pitch",
      level: "block",
      stage: "spark",
      title: "No pitch",
      detail: "One sentence: who does what, where, and the feeling. Lore is not a pitch.",
    });
  }
  if (project.medium === "book" && !filled(answers.premise)) {
    push({
      id: "premise",
      level: "block",
      stage: "promise",
      title: "No premise",
      detail: "When something happens, someone must do something, or else, but. A mood is not a premise.",
    });
  }
  if (!filled(answers.weeklyHours)) {
    push({
      id: "hours",
      level: "block",
      stage: "scale",
      title: "No weekly hours",
      detail: "Without hours, every date on the roadmap is a wish.",
    });
  }
  if (!band || band === "dream" || band === "saga") {
    push({
      id: "band",
      level: "block",
      stage: "scale",
      title: band === "dream" || band === "saga" ? "That band cannot be scheduled" : "No size band",
      detail:
        band === "dream"
          ? "The dream version is a parking lot. Pick a proof, a solo game, or a team that already exists."
          : band === "saga"
            ? "A saga is not the thing you sell first. Pick the story, novella, or novel you will finish."
            : "Choose the size you can finish, not the size that excites you.",
    });
  }
  if (productGame && !filled(answers.verb)) {
    push({
      id: "verb",
      level: "block",
      stage: "concept",
      title: "No core verb",
      detail: "Describe the thirty-second action without story. If you can't, you are designing a wiki.",
    });
  }
  if (productGame && !filled(answers.slice)) {
    push({
      id: "slice",
      level: "block",
      stage: "spine",
      title: "No vertical slice",
      detail: "Name the one chunk that will look and feel finished. Not a prototype of every system.",
    });
  }
  if (productGame && !filled(answers.price)) {
    push({
      id: "price",
      level: "block",
      stage: "market",
      title: "No price",
      detail: "Price is a length promise. Pick it before you build content for a game you have not priced.",
    });
  }
  if ((answers.price === "indie" || answers.price === "full") && !filled(answers.refundTest)) {
    push({
      id: "refund",
      level: "block",
      stage: "market",
      title: "Refund window unanswered",
      detail:
        "A player can return a Steam game inside two hours. What is still left — or why is this a short game instead?",
    });
  }
  if (project.medium === "book" && !filled(answers.want) && (filled(answers.premise) || finishableBook)) {
    push({
      id: "want",
      level: "block",
      stage: "promise",
      title: "The protagonist wants nothing",
      detail: "A want you can say out loud. Readers stay for a person trying to get something.",
    });
  }
  if (project.medium === "book" && finishableBook && !filled(answers.ending)) {
    push({
      id: "ending",
      level: "block",
      stage: "spine",
      title: "No ending",
      detail: "Spoil it now. If the ending is a surprise for you, the draft will wander into a saga.",
    });
  }
  if (project.medium === "book" && finishableBook && !parseWords(answers.wordTarget)) {
    push({
      id: "words",
      level: "block",
      stage: "scale",
      title: "No word target",
      detail: "A number is a scope lock. 'However long it needs' is how novellas become trilogies.",
    });
  }
  if (cap !== null && shipN > cap) {
    push({
      id: "cap",
      level: "block",
      stage: "scale",
      title: "The ship list is over the band",
      detail: `${shipN} items are in the build. This band holds ${cap}. Park or cut until it fits.`,
    });
  }
  if (project.medium === "game" && band === "team" && !filled(answers.whoBuilds)) {
    push({
      id: "team",
      level: "block",
      stage: "scale",
      title: "A team that doesn't exist",
      detail: "Name the people and roles who already said yes. 'I might hire' is not a team.",
    });
  }
  if (project.medium === "book" && answers.seriesStance === "series" && !filled(answers.bookOnePays)) {
    push({
      id: "bookone",
      level: "block",
      stage: "scale",
      title: "This volume doesn't pay its own promise",
      detail: "Write the question book one answers completely. The rest of the saga can wait.",
    });
  }
  if (productGame && wordCount(answers.eightWords) === 0) {
    push({
      id: "hook",
      level: "block",
      stage: "promise",
      title: "No store hook",
      detail: "Eight words a stranger can repeat. If it needs a paragraph, the page will not convert.",
    });
  } else if (project.medium === "game" && wordCount(answers.eightWords) > 8) {
    push({
      id: "hooklen",
      level: "warn",
      stage: "promise",
      title: "The hook is longer than eight words",
      detail: `${wordCount(answers.eightWords)} words. Cut until a capsule can carry it.`,
    });
  }

  const compsShort = !filled(answers.comps) || answers.comps.trim().length < 24;
  if (compsShort) {
    push({
      id: "comps",
      level: productGame || productBook ? "block" : "warn",
      stage: "promise",
      title: "No real comps",
      detail: "Name titles, what you take, and what you refuse. 'Like nothing else' means you don't know the shelf.",
    });
  }
  if (killN < 3 && shipN + dreamN > 0) {
    push({
      id: "kills",
      level: "warn",
      stage: "scale",
      title: "Almost nothing has been cut",
      detail: "Big ideas shrink by decisions. Write at least three cuts with reasons, or the dream walks back in.",
    });
  }
  if (!filled(answers.notThis)) {
    push({
      id: "not",
      level: "warn",
      stage: "promise",
      title: "You haven't said what this isn't",
      detail: "Write the genres and features you are refusing. That sentence is a lock.",
    });
  }
  const pillars = linesOf(answers.pillars);
  if (productGame && pillars.length === 0) {
    push({
      id: "pillars",
      level: "block",
      stage: "concept",
      title: "No pillars",
      detail: "Three pillars. Every feature serves one, or it is cut.",
    });
  } else if (project.medium === "game" && pillars.length > 0 && pillars.length !== 3) {
    push({
      id: "pillarcount",
      level: "warn",
      stage: "concept",
      title: pillars.length > 3 ? "Too many pillars" : "Thin pillars",
      detail: "Use exactly three. Fewer and the game is vague. More and they stop cutting anything.",
    });
  }
  if (!filled(answers.audience) && (productGame || productBook || band === "story")) {
    push({
      id: "audience",
      level: "warn",
      stage: "market",
      title: "No audience",
      detail: "Who already pays for something adjacent? 'Everyone who likes good stories' is not a person.",
    });
  }
  if (productGame && !filled(answers.storeProof)) {
    push({
      id: "store",
      level: "warn",
      stage: "market",
      title: "No store proof",
      detail: "Say what the capsule, the trailer, and the first minute must show. If it isn't the verb, it's the wrong footage.",
    });
  }
  if (productBook && !filled(answers.package)) {
    push({
      id: "package",
      level: "warn",
      stage: "market",
      title: "Done isn't defined",
      detail: "List the artifacts for the path you chose. Query packet, or cover, edit, blurb, categories.",
    });
  }
  if (productBook && !filled(answers.logline)) {
    push({
      id: "logline",
      level: "warn",
      stage: "promise",
      title: "No jacket line",
      detail: "Two sentences that sell the problem. Not the lore.",
    });
  }
  if (project.medium === "book" && filled(answers.want) && !filled(answers.need)) {
    push({
      id: "need",
      level: "warn",
      stage: "promise",
      title: "Want without a need",
      detail: "The need should argue with the want. Otherwise the ending has nothing to turn.",
    });
  }
  if (
    project.medium === "book" &&
    filled(answers.want) &&
    filled(answers.need) &&
    answers.want.trim().toLowerCase() === answers.need.trim().toLowerCase()
  ) {
    push({
      id: "sameneed",
      level: "warn",
      stage: "promise",
      title: "Want and need are the same",
      detail: "If they match, there is no internal argument. Make the need cost the want.",
    });
  }
  const length = lengthVerdict(project);
  if (length && length.level !== "ok") {
    push({ id: "length", level: "warn", stage: "scale", title: "Word target fights the band", detail: length.text });
  }
  const pace = paceNote(project);
  if (pace?.problem) {
    push({ id: "pace", level: "warn", stage: "scale", title: "Hours don't match the band", detail: pace.text });
  }
  if (!filled(answers.horizon) && band && band !== "dream" && band !== "saga") {
    push({
      id: "horizon",
      level: "warn",
      stage: "scale",
      title: "No horizon",
      detail: "Name a window for the slice or the draft, and a later window for done. A year is allowed. Someday is not.",
    });
  }
  if (productBook && !filled(answers.shelf)) {
    push({
      id: "shelf",
      level: "warn",
      stage: "market",
      title: "No shelf",
      detail: "Name where a bookseller would file it. Comps and cover codes come from that.",
    });
  }
  if (finishableBook && !filled(answers.path)) {
    push({
      id: "path",
      level: "warn",
      stage: "market",
      title: "No path to a reader",
      detail: "Traditional, self-published, or serial. Each has a different definition of done.",
    });
  }
  if (band === "proof" && (answers.price === "indie" || answers.price === "full")) {
    push({
      id: "proofprice",
      level: "warn",
      stage: "market",
      title: "A proof priced like a product",
      detail: "Drop the price to free or short, or change the band to the commercial game you will actually finish.",
    });
  }
  const phase0 = PHASES[project.medium][0];
  const phase0done = phase0.tasks.every((task) => project.tasks[taskKey(phase0.id, task.id)]);
  if (!phase0done) {
    push({
      id: "phase0",
      level: "warn",
      stage: "roadmap",
      title: "The lock phase isn't done",
      detail: "Those boxes are the gate. Later phases will lie to you until the lock is honest.",
    });
  }
  return out.sort((a, b) => Number(b.level === "block") - Number(a.level === "block"));
}

export function marketableItems(project: Project): CheckItem[] {
  const answers = project.answers;
  const band = answers.sizeBand ?? "";
  const cap = shipCap(project);
  const shipN = liveLines(project.ship).length;
  const killN = liveKills(project.kills).length;
  const length = lengthVerdict(project);
  if (project.medium === "game") {
    const commercial = band === "solo" || band === "team";
    return [
      {
        id: "hook",
        label: "Hook is eight words or fewer",
        ok: wordCount(answers.eightWords) > 0 && wordCount(answers.eightWords) <= 8,
      },
      { id: "verb", label: "The verb can be pictured without the story", ok: wordCount(answers.verb) >= 8 },
      { id: "slice", label: "A vertical slice is defined", ok: filled(answers.slice) },
      { id: "price", label: "A price band is chosen", ok: filled(answers.price) },
      {
        id: "refund",
        label: "Two hours still leaves game, or the price is honestly short",
        ok: filled(answers.refundTest) || answers.price === "short" || answers.price === "free",
      },
      { id: "store", label: "Capsule, trailer, and first minute are specified", ok: filled(answers.storeProof) },
      { id: "cuts", label: "At least three cuts have reasons", ok: killN >= 3 },
      {
        id: "band",
        label: commercial ? "The band is a game you can schedule" : "The band is finishable, and not the dream",
        ok: band === "proof" || band === "solo" || band === "team",
      },
      { id: "cap", label: "The ship list fits the band", ok: cap !== null && shipN <= cap && shipN > 0 },
      { id: "comps", label: "Comps name what you take and what you refuse", ok: (answers.comps ?? "").trim().length >= 24 },
    ];
  }
  return [
    { id: "premise", label: "The premise has a person, a want, and trouble", ok: filled(answers.premise) },
    {
      id: "need",
      label: "Want and need both exist, and they are not the same",
      ok:
        filled(answers.want) &&
        filled(answers.need) &&
        answers.want.trim().toLowerCase() !== answers.need.trim().toLowerCase(),
    },
    { id: "ending", label: "The ending is written, including what it costs", ok: wordCount(answers.ending) >= 12 },
    { id: "length", label: "The word target sits inside the band", ok: length?.level === "ok" },
    { id: "comps", label: "Comps are real books on a living shelf", ok: (answers.comps ?? "").trim().length >= 24 },
    { id: "package", label: "Done means a package, not a feeling", ok: filled(answers.package) },
    { id: "logline", label: "The jacket line sells the problem", ok: filled(answers.logline) },
    {
      id: "alone",
      label: "This volume pays its own question",
      ok:
        answers.seriesStance === "standalone" ||
        answers.seriesStance === "door" ||
        (answers.seriesStance === "series" && filled(answers.bookOnePays)),
    },
    { id: "cap", label: "Plot threads fit the length", ok: cap !== null && shipN <= cap },
    { id: "cuts", label: "At least three cuts have reasons", ok: killN >= 3 },
  ];
}

export function listLabels(project: Project): { ship: string; dream: string } {
  return { ship: LIST_COPY[project.medium].ship, dream: LIST_COPY[project.medium].dream };
}
