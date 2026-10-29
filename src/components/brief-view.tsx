import { useState } from "react";
import { briefBlocks, briefPlain } from "@/lib/brief";
import { MARKET_LINE, optionLabel } from "@/lib/framework";
import type { Project } from "@/lib/model";
import { Roadmap } from "@/components/roadmap";

export function BriefView({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const blocks = briefBlocks(project).filter((block) => block.heading !== "Roadmap");
  const band = optionLabel(project.medium, "sizeBand", project.answers.sizeBand) || "No band";
  const hours = optionLabel(project.medium, "weeklyHours", project.answers.weeklyHours) || "No hours";

  async function copy() {
    try {
      await navigator.clipboard.writeText(briefPlain(project));
      setFailed(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setFailed(true);
    }
  }

  return (
    <article className="mx-auto max-w-2xl px-4 py-6 sm:py-10">
      <div className="no-print flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void copy()}
          className="min-h-11 rounded-md bg-ink px-4 text-sm font-medium text-paper"
        >
          {copied ? "Copied" : "Copy brief"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-11 rounded-md border border-ink px-4 text-sm font-medium"
        >
          Print
        </button>
      </div>
      {failed ? (
        <textarea
          readOnly
          value={briefPlain(project)}
          className="no-print mt-3 h-40 w-full border border-line bg-card p-3 text-sm"
          aria-label="Brief text"
        />
      ) : null}

      <header className="mt-6 border-b border-ink pb-6">
        <p className="text-xs font-semibold tracking-widest text-wax-deep">PRODUCTION BRIEF</p>
        <h1 className="mt-2 font-display text-4xl text-balance sm:text-5xl">{project.title}</h1>
        <p className="mt-3 text-muted">
          {project.medium === "game" ? "Game" : "Book"} · {band} · {hours}
        </p>
        <p className="mt-5 font-display text-xl italic text-balance">{MARKET_LINE[project.medium]}</p>
      </header>

      {blocks.map((block) => (
        <section key={block.heading} className="border-b border-line py-6">
          <h2 className="text-xs font-semibold tracking-widest text-muted">{block.heading.toUpperCase()}</h2>
          {block.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-3 whitespace-pre-wrap text-pretty">
              {paragraph}
            </p>
          ))}
          {block.items ? (
            <ul className="mt-3 space-y-2">
              {block.items.map((item) => (
                <li key={`${item.title}-${item.detail ?? ""}`} className="text-pretty">
                  <span>{item.title}</span>
                  {item.detail ? <span className="text-muted"> — {item.detail}</span> : null}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <section className="py-6">
        <h2 className="text-xs font-semibold tracking-widest text-muted">ROADMAP</h2>
        <div className="mt-2">
          <Roadmap project={project} />
        </div>
      </section>
    </article>
  );
}
