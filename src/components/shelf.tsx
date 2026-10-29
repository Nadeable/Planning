import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { formatDistanceToNowStrict } from "date-fns";
import { findings } from "@/lib/checks";
import { optionLabel } from "@/lib/framework";
import { filled, planStarted, type Project } from "@/lib/model";
import { useDesk } from "@/lib/store";
import { cn } from "@/lib/cn";

const STEPS = [
  {
    n: "01",
    title: "Capture",
    body: "One sentence before lore, systems, or a map. If it cannot be small on the page, it will not survive production.",
  },
  {
    n: "02",
    title: "Scale gate",
    body: "Park the dream. Pick a size your real weekly hours can finish. The dream is not a schedule.",
  },
  {
    n: "03",
    title: "Market test",
    body: "Write what done and sellable looks like: price or word count, an ending, and the artifact a stranger meets first.",
  },
  {
    n: "04",
    title: "Roadmap",
    body: "Phases that end when something is true — a fun greybox, a spoiled ending, a cold player — not when you feel ready.",
  },
];

export function Shelf() {
  const projects = useDesk((state) => state.projects);
  const create = useDesk((state) => state.create);
  const navigate = useNavigate();
  const yours = projects.filter((project) => !project.example);
  const examples = projects.filter((project) => project.example);

  function start(medium: "game" | "book") {
    const id = create(medium);
    void navigate({ to: "/p/$id", params: { id } });
  }

  return (
    <div className="min-h-screen border-t-4 border-ink">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <header className="flex items-center gap-3">
          <span className="size-3.5 bg-wax" aria-hidden />
          <p className="text-xs font-semibold tracking-widest">SCOPEWRIGHT</p>
        </header>
        <h1 className="mt-8 max-w-xl font-display text-4xl text-balance sm:text-5xl">
          Finish the version someone can buy.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-pretty text-muted">
          Ideas arrive already too big. This desk is the interruption for games and books: park the dream, lock a
          size, and write a road that actually ends.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => start("game")}
            className="rounded-lg border border-line bg-card p-5 text-left transition-colors duration-200 hover:border-ink"
          >
            <p className="text-xs font-semibold tracking-widest text-wax-deep">GAME</p>
            <p className="mt-2 font-display text-2xl">Start a game</p>
            <p className="mt-2 text-sm text-pretty text-muted">
              Verb, pillars, price, and one slice — before the open world gets a calendar.
            </p>
          </button>
          <button
            type="button"
            onClick={() => start("book")}
            className="rounded-lg border border-ink bg-ink p-5 text-left text-paper transition-colors duration-200 hover:bg-wax"
          >
            <p className="text-xs font-semibold tracking-widest text-wax-ink">BOOK</p>
            <p className="mt-2 font-display text-2xl">Start a book</p>
            <p className="mt-2 text-sm text-pretty text-wax-ink">
              Premise, ending, word count, and a shelf — before the saga gets a bible.
            </p>
          </button>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl">How a plan gets honest</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2">
            {STEPS.map((step) => (
              <li key={step.n} className="border-t border-line pt-3">
                <p className="text-xs font-semibold tracking-widest text-muted">{step.n}</p>
                <p className="mt-1 font-medium">{step.title}</p>
                <p className="mt-1 text-sm text-pretty text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">A marketable game</h2>
            <ul className="mt-3 space-y-2 text-sm text-pretty text-muted">
              <li>A verb a trailer can show in five seconds.</li>
              <li>One loop that is fun without the story.</li>
              <li>A length that matches the price, including a two-hour refund window.</li>
              <li>An ending, or a deliberate stop.</li>
              <li>Capsule, trailer, and first minute that agree.</li>
              <li>A kill list. The dream is not the product.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl">A marketable book</h2>
            <ul className="mt-3 space-y-2 text-sm text-pretty text-muted">
              <li>A premise a stranger can repeat.</li>
              <li>A want, a need that costs it, and an ending that pays both.</li>
              <li>A word count inside the shelf's band.</li>
              <li>Comps from books people finish now, not only the classics.</li>
              <li>A path: query packet, or cover, edit, and blurb.</li>
              <li>Book one still ends, even if the world could continue.</li>
            </ul>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl">On your desk</h2>
          {yours.length === 0 ? (
            <p className="mt-3 max-w-xl text-pretty text-muted">
              Nothing of yours yet. Read a worked plan below, then start smaller than the idea wants. The desk will
              argue if you overfill it.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {yours.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </ul>
          )}
        </section>

        {examples.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl">Study a worked plan</h2>
            <p className="mt-2 max-w-xl text-sm text-pretty text-muted">
              Both of these started as something much larger. The brief is what's left after the cuts.
            </p>
            <ul className="mt-4 grid gap-3">
              {examples.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-14 text-sm text-muted">Saved in this browser only. Clearing site data clears the desk.</p>
      </div>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const remove = useDesk((state) => state.remove);
  const duplicate = useDesk((state) => state.duplicate);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const pitch = project.medium === "game" ? project.answers.pitch : project.answers.premise || project.answers.image;
  const band = optionLabel(project.medium, "sizeBand", project.answers.sizeBand);
  const issues = planStarted(project) ? findings(project) : [];
  const blocks = issues.filter((issue) => issue.level === "block").length;

  return (
    <li className="flex min-w-0 items-stretch border border-line bg-card">
      <Link
        to="/p/$id"
        params={{ id: project.id }}
        className="min-w-0 flex-1 p-4 no-underline"
      >
        <p className="text-xs font-semibold tracking-widest text-wax-deep">
          {project.example ? "EXAMPLE · " : ""}
          {project.medium === "game" ? "GAME" : "BOOK"}
        </p>
        <p className="mt-1 break-words font-display text-2xl text-balance">{project.title}</p>
        <p className="mt-2 line-clamp-2 text-sm text-pretty text-muted">
          {filled(pitch) ? pitch : "No sentence yet."}
        </p>
        <p className="mt-3 text-xs text-muted">
          {band || "No band"}
          {" · "}
          {blocks > 0 ? `${blocks} blocking · ` : planStarted(project) ? "Plan honest · " : ""}
          edited {formatDistanceToNowStrict(project.updatedAt, { addSuffix: true })}
        </p>
      </Link>
      <div className="flex shrink-0 flex-col justify-center gap-1 border-l border-line px-2">
        {project.example ? (
          <button
            type="button"
            className="min-h-11 px-3 text-sm hover:text-wax-deep"
            onClick={() => {
              const id = duplicate(project.id);
              if (id) void navigate({ to: "/p/$id", params: { id } });
            }}
          >
            Copy
          </button>
        ) : null}
        <button
          type="button"
          className={cn("min-h-11 px-3 text-sm", confirm ? "text-wax-deep" : "text-muted hover:text-ink")}
          onClick={() => {
            if (!confirm) {
              setConfirm(true);
              return;
            }
            remove(project.id);
          }}
        >
          {confirm ? "Confirm" : "Delete"}
        </button>
      </div>
    </li>
  );
}
