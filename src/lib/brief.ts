import { findings, lengthVerdict, paceNote, shipCap } from "@/lib/checks";
import { MARKET_LINE, PHASES, optionLabel, taskKey } from "@/lib/framework";
import { filled, liveKills, liveLines, type Project } from "@/lib/model";

export type BriefBlock = {
  heading: string;
  paragraphs?: string[];
  items?: { title: string; detail?: string }[];
};

function missing(value: string | undefined, label: string): string {
  return filled(value) ? value!.trim() : `${label} — not written yet.`;
}

export function briefBlocks(project: Project): BriefBlock[] {
  const answers = project.answers;
  const band = optionLabel(project.medium, "sizeBand", answers.sizeBand) || "No band chosen";
  const hours = optionLabel(project.medium, "weeklyHours", answers.weeklyHours) || "No hours chosen";
  const pace = paceNote(project);
  const length = lengthVerdict(project);
  const cap = shipCap(project);
  const ship = liveLines(project.ship);
  const dream = liveLines(project.dream);
  const kills = liveKills(project.kills);
  const blocks: BriefBlock[] = [];

  if (project.medium === "game") {
    blocks.push({
      heading: "Pitch",
      paragraphs: [
        missing(answers.pitch, "Pitch"),
        filled(answers.eightWords) ? `Hook: ${answers.eightWords.trim()}` : "Hook — not written yet.",
        filled(answers.fantasy) ? `Fantasy: ${answers.fantasy.trim()}` : "Fantasy — not written yet.",
      ],
    });
  } else {
    blocks.push({
      heading: "Premise",
      paragraphs: [
        missing(answers.premise, "Premise"),
        filled(answers.logline) ? `Jacket: ${answers.logline.trim()}` : "Jacket line — not written yet.",
        filled(answers.want) ? `Want: ${answers.want.trim()}` : "Want — not written yet.",
        filled(answers.need) ? `Need: ${answers.need.trim()}` : "Need — not written yet.",
      ],
    });
  }

  blocks.push({
    heading: "Refused",
    paragraphs: [missing(answers.notThis, "What this isn't")],
  });

  blocks.push({
    heading: "Size",
    paragraphs: [
      `${band}. ${hours}.`,
      filled(answers.horizon) ? answers.horizon.trim() : "No dates yet.",
      filled(answers.honestWhy) ? answers.honestWhy.trim() : "",
      pace?.text ?? "",
      length?.text ?? "",
      cap !== null ? `Ship list cap for this band: ${cap}.` : "",
    ].filter(Boolean),
  });

  blocks.push({
    heading: project.medium === "game" ? "In the build" : "In this book",
    items: ship.length
      ? ship.map((line) => ({ title: line.text }))
      : [{ title: "Nothing is on the ship list yet." }],
  });

  blocks.push({
    heading: "Parked",
    items: dream.length ? dream.map((line) => ({ title: line.text })) : [{ title: "Nothing is parked. That is suspicious." }],
  });

  blocks.push({
    heading: "Cuts",
    items: kills.length
      ? kills.map((kill) => ({ title: kill.what, detail: kill.why }))
      : [{ title: "No cuts yet." }],
  });

  if (project.medium === "game") {
    blocks.push({
      heading: "Spine",
      paragraphs: [
        filled(answers.verb) ? `Verb: ${answers.verb.trim()}` : "Verb — not written yet.",
        missing(answers.loopLayers, "Loop"),
        missing(answers.slice, "Slice"),
        filled(answers.pillars) ? `Pillars:\n${answers.pillars.trim()}` : "Pillars — not written yet.",
      ],
    });
    blocks.push({
      heading: "Market",
      paragraphs: [
        MARKET_LINE.game,
        missing(answers.audience, "Audience"),
        optionLabel("game", "price", answers.price)
          ? `Price: ${optionLabel("game", "price", answers.price)}.`
          : "Price — not chosen.",
        filled(answers.platform) ? answers.platform.trim() : "",
        missing(answers.refundTest, "After two hours"),
        missing(answers.storeProof, "Store proof"),
      ].filter(Boolean),
    });
  } else {
    blocks.push({
      heading: "Spine",
      paragraphs: [
        missing(answers.ending, "Ending"),
        missing(answers.beats, "Beats"),
        filled(answers.pov) ? `Point of view: ${answers.pov.trim()}` : "",
        filled(answers.about) ? answers.about.trim() : "",
      ].filter(Boolean),
    });
    blocks.push({
      heading: "Market",
      paragraphs: [
        MARKET_LINE.book,
        optionLabel("book", "shelf", answers.shelf)
          ? `Shelf: ${optionLabel("book", "shelf", answers.shelf)}.`
          : "Shelf — not chosen.",
        optionLabel("book", "path", answers.path)
          ? `Path: ${optionLabel("book", "path", answers.path)}.`
          : "Path — not chosen.",
        missing(answers.audience, "Reader"),
        missing(answers.package, "Package"),
      ].filter(Boolean),
    });
  }

  const issues = findings(project);
  blocks.push({
    heading: "Still in the way",
    items: issues.length
      ? issues.map((issue) => ({ title: issue.title, detail: issue.detail }))
      : [{ title: "Nothing is blocking the plan. The work is still ahead of you." }],
  });

  blocks.push({
    heading: "Roadmap",
    items: PHASES[project.medium].flatMap((phase) =>
      phase.tasks.map((task) => ({
        title: `${project.tasks[taskKey(phase.id, task.id)] ? "[x]" : "[ ]"} ${phase.name}: ${task.label}`,
      })),
    ),
  });

  return blocks;
}

export function briefPlain(project: Project): string {
  const lines: string[] = [
    project.title,
    project.medium === "game" ? "Game" : "Book",
    "",
    MARKET_LINE[project.medium],
    "",
  ];
  for (const block of briefBlocks(project)) {
    lines.push(block.heading.toUpperCase());
    for (const paragraph of block.paragraphs ?? []) lines.push(paragraph, "");
    for (const item of block.items ?? []) {
      lines.push(item.detail ? `- ${item.title} — ${item.detail}` : `- ${item.title}`);
    }
    lines.push("");
  }
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
