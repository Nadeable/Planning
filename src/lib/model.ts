export type Medium = "game" | "book";

export type Line = { id: string; text: string };

export type Kill = { id: string; what: string; why: string };

export type Project = {
  id: string;
  medium: Medium;
  title: string;
  createdAt: number;
  updatedAt: number;
  example?: boolean;
  stage: string;
  answers: Record<string, string>;
  ship: Line[];
  dream: Line[];
  kills: Kill[];
  tasks: Record<string, boolean>;
  phaseNotes: Record<string, string>;
};

export type Fill = "empty" | "partial" | "ready" | "neutral";

export function filled(value: string | undefined | null): boolean {
  return Boolean(value && value.trim().length > 0);
}

export function linesOf(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function wordCount(value: string | undefined): number {
  if (!filled(value)) return 0;
  return value!.trim().split(/\s+/).filter(Boolean).length;
}

export function parseWords(value: string | undefined): number | null {
  if (!filled(value)) return null;
  const n = Number(value!.replace(/[,_\s]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n);
}

export function formatWords(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/** Midpoint hours for the weekly-hours choice ids. */
export const HOURS: Record<string, number> = {
  u5: 4,
  h10: 8,
  h20: 15,
  h40: 30,
  over: 45,
};

export function liveLines(lines: Line[] | undefined): Line[] {
  return (lines ?? []).filter((line) => line.text.trim());
}

export function liveKills(kills: Kill[] | undefined): Kill[] {
  return (kills ?? []).filter((kill) => kill.what.trim());
}

export function planStarted(project: Project): boolean {
  const content = Object.values(project.answers).some((value) => filled(value));
  const lists =
    liveLines(project.ship).length +
    liveLines(project.dream).length +
    liveKills(project.kills).length;
  return content || lists > 0;
}
