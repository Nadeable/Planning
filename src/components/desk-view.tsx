import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BriefView } from "@/components/brief-view";
import { Roadmap } from "@/components/roadmap";
import { ScopeDialog } from "@/components/scope-dialog";
import { ScopeLists, ScopeMeter } from "@/components/scope-lists";
import { findings, lengthVerdict, marketableItems, paceNote, priceMust, stageFill } from "@/lib/checks";
import {
  MARKET_LINE,
  REMINDERS,
  STAGES,
  optionLabel,
  reminderFor,
  stageById,
} from "@/lib/framework";
import { linesOf, planStarted, wordCount, type Project } from "@/lib/model";
import { useDesk } from "@/lib/store";
import { cn } from "@/lib/cn";

export function DeskView({ projectId }: { projectId: string }) {
  const project = useDesk((state) => state.projects.find((item) => item.id === projectId));
  const setTitle = useDesk((state) => state.setTitle);
  const setStage = useDesk((state) => state.setStage);
  const setAnswer = useDesk((state) => state.setAnswer);
  const duplicate = useDesk((state) => state.duplicate);
  const navigate = useNavigate();
  const [mode, setMode] = useState<"desk" | "brief">("desk");
  const [gapsOpen, setGapsOpen] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(false);

  if (!project) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <h1 className="font-display text-3xl text-balance">This idea isn't on this device.</h1>
        <p className="mt-3 text-pretty text-muted">Plans stay in the browser where you wrote them.</p>
        <Link to="/" className="mt-6 inline-flex min-h-11 items-center font-medium">
          Back to the desk
        </Link>
      </main>
    );
  }

  const stage = stageById(project.medium, project.stage || "spark");
  const issues = findings(project);
  const blocks = issues.filter((issue) => issue.level === "block");
  const warns = issues.filter((issue) => issue.level === "warn");
  const started = planStarted(project);
  const reminder = reminderFor(project.medium, stage.id);
  const band = optionLabel(project.medium, "sizeBand", project.answers.sizeBand);
  const hours = optionLabel(project.medium, "weeklyHours", project.answers.weeklyHours);

  function openStage(id: string) {
    setStage(project!.id, id);
    setMode("desk");
    setGapsOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="min-h-screen border-t-4 border-ink pb-24">
      <header className="no-print border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <Link to="/" className="min-h-11 inline-flex items-center text-sm font-medium">
            All ideas
          </Link>
          <span className="text-xs font-semibold tracking-widest text-wax-deep">
            {project.medium === "game" ? "GAME" : "BOOK"}
          </span>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => {
                const id = duplicate(project.id);
                if (id) void navigate({ to: "/p/$id", params: { id } });
              }}
              className="min-h-11 px-3 text-sm text-muted hover:text-ink"
            >
              Make a copy
            </button>
            <div className="flex rounded-md border border-line">
              <button
                type="button"
                aria-pressed={mode === "desk"}
                onClick={() => setMode("desk")}
                className={cn("min-h-11 px-3 text-sm", mode === "desk" ? "bg-ink text-paper" : "text-ink")}
              >
                Desk
              </button>
              <button
                type="button"
                aria-pressed={mode === "brief"}
                onClick={() => setMode("brief")}
                className={cn("min-h-11 px-3 text-sm", mode === "brief" ? "bg-ink text-paper" : "text-ink")}
              >
                Brief
              </button>
            </div>
          </div>
        </div>
      </header>

      {mode === "brief" ? (
        <BriefView project={project} />
      ) : (
        <>
          <div className="no-print border-b border-line">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 text-sm">
              <span>{band || "No band yet"}</span>
              <span className="text-muted">{hours || "No hours yet"}</span>
              <ScopeMeter project={project} compact />
              <button
                type="button"
                onClick={() => setGapsOpen((open) => !open)}
                className={cn("min-h-11 font-medium", blocks.length ? "text-wax-deep" : "text-ink")}
                aria-expanded={gapsOpen}
              >
                {!started
                  ? "Checks wait for an idea"
                  : blocks.length
                    ? `${blocks.length} blocking${warns.length ? ` · ${warns.length} to watch` : ""}`
                    : warns.length
                      ? `${warns.length} to watch`
                      : "Plan is honest"}
              </button>
            </div>
            {gapsOpen ? (
              <div className="mx-auto max-w-6xl px-4 pb-4">
                {!started ? (
                  <p className="text-sm text-pretty text-muted">
                    Write the spark first. The gate starts once there is an idea to discipline.
                  </p>
                ) : issues.length === 0 ? (
                  <p className="text-sm text-pretty">
                    Nothing is blocking the plan. That is not the same as finished — it means the work ahead is
                    the roadmap, not another expansion.
                  </p>
                ) : (
                  <ul className="max-h-80 space-y-2 overflow-y-auto">
                    {issues.map((issue) => (
                      <li key={issue.id}>
                        <button
                          type="button"
                          onClick={() => openStage(issue.stage)}
                          className="w-full rounded-md border border-line bg-card px-3 py-3 text-left"
                        >
                          <span
                            className={cn(
                              "text-xs font-semibold tracking-widest",
                              issue.level === "block" ? "text-wax-deep" : "text-muted",
                            )}
                          >
                            {issue.level === "block" ? "BLOCK" : "WATCH"}
                          </span>
                          <span className="mt-1 block font-medium">{issue.title}</span>
                          <span className="mt-1 block text-sm text-pretty text-muted">{issue.detail}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 lg:grid-cols-[13rem_minmax(0,1fr)_17rem] lg:py-8">
            <nav className="no-print min-w-0 lg:sticky lg:top-4 lg:self-start" aria-label="Stages">
              <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                {STAGES[project.medium].map((item) => {
                  const fill = stageFill(project, item.id);
                  const active = item.id === stage.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-current={active ? "step" : undefined}
                      onClick={() => openStage(item.id)}
                      className={cn(
                        "flex min-h-11 shrink-0 items-center gap-2 rounded-md px-3 text-left text-sm lg:w-full",
                        active ? "bg-ink text-paper" : "hover:bg-paper-2",
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-full",
                          fill === "ready" && (active ? "bg-paper" : "bg-ink"),
                          fill === "partial" && "bg-wax",
                          (fill === "empty" || fill === "neutral") && (active ? "bg-line" : "bg-line"),
                        )}
                        aria-hidden
                      />
                      <span className="tabular-nums opacity-70">{item.numeral}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <article className="min-w-0">
              <label className="block">
                <span className="text-xs font-semibold tracking-widest text-muted">WORKING TITLE</span>
                <input
                  value={project.title}
                  onChange={(event) => setTitle(project.id, event.target.value)}
                  aria-label="Working title"
                  className="mt-1 w-full border-0 bg-transparent px-0 font-display text-3xl leading-tight text-ink sm:text-4xl"
                />
              </label>

              {project.example ? (
                <p className="mt-4 border border-line bg-paper-2 px-4 py-3 text-sm text-pretty">
                  Worked example. Edit it to see the gate move, or make a copy and replace the sentences with yours.
                </p>
              ) : null}

              <p className="mt-6 text-xs font-semibold tracking-widest text-wax-deep">
                {stage.numeral} — {stage.label.toUpperCase()}
              </p>
              <h1 className="mt-2 font-display text-3xl text-balance">{stage.title}</h1>
              <p className="mt-3 max-w-xl text-pretty text-muted">{stage.guide}</p>
              <aside className="mt-5 border-l-2 border-wax bg-wax-soft px-4 py-3">
                <p className="text-xs font-semibold tracking-widest text-wax-deep">RULE</p>
                <p className="mt-1 text-sm text-pretty">{stage.rule}</p>
              </aside>

              {stage.id === "market" ? (
                <p className="mt-6 font-display text-xl italic text-balance">{MARKET_LINE[project.medium]}</p>
              ) : null}

              <div className="mt-8 space-y-8">
                {stage.fields
                  .filter((field) => !field.show || field.show(project.answers))
                  .map((field) => (
                    <FieldBlock
                      key={field.id}
                      project={project}
                      fieldId={field.id}
                      label={field.label}
                      help={field.help}
                      placeholder={field.placeholder}
                      kind={field.kind}
                      options={field.options}
                      value={project.answers[field.id] ?? ""}
                      onChange={(value) => setAnswer(project.id, field.id, value)}
                    />
                  ))}
              </div>

              {stage.id === "scale" ? (
                <div className="mt-10">
                  <ScopeLists project={project} />
                </div>
              ) : null}

              {stage.id === "market" ? <MarketList project={project} /> : null}
              {stage.id === "roadmap" ? (
                <div className="mt-8">
                  <Roadmap project={project} />
                </div>
              ) : null}
              {stage.id === "reminders" ? (
                <ol className="mt-8">
                  {REMINDERS[project.medium].map((item, index) => (
                    <li key={item.id} className="border-t border-line py-5">
                      <p className="text-xs tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</p>
                      <h2 className="mt-1 font-display text-xl">{item.title}</h2>
                      <p className="mt-2 max-w-xl text-pretty text-muted">{item.body}</p>
                    </li>
                  ))}
                </ol>
              ) : null}
            </article>

            <aside className="no-print min-w-0 space-y-4 lg:sticky lg:top-4 lg:self-start">
              <div className="border border-line bg-card p-4">
                <ScopeMeter project={project} />
              </div>
              <div className="border-l-2 border-ink px-4 py-1">
                <p className="text-xs font-semibold tracking-widest text-muted">REMEMBER</p>
                <p className="mt-2 font-display text-lg text-balance">{reminder.title}</p>
                <p className="mt-2 text-sm text-pretty text-muted">{reminder.body}</p>
                {stage.id !== "reminders" ? (
                  <button
                    type="button"
                    onClick={() => openStage("reminders")}
                    className="mt-3 min-h-11 text-sm font-medium text-wax-deep"
                  >
                    All reminders
                  </button>
                ) : null}
              </div>
            </aside>
          </div>
        </>
      )}

      <div className="no-print fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <p className="hidden text-sm text-muted sm:block">Adding a feature, a country, a system?</p>
          <button
            type="button"
            onClick={() => setScopeOpen(true)}
            className="min-h-11 rounded-md bg-wax-deep px-4 font-semibold text-wax-ink sm:ml-auto"
          >
            Before you add scope
          </button>
        </div>
      </div>
      <ScopeDialog project={project} open={scopeOpen} onClose={() => setScopeOpen(false)} />
    </div>
  );
}

function FieldBlock({
  project,
  fieldId,
  label,
  help,
  placeholder,
  kind,
  options,
  value,
  onChange,
}: {
  project: Project;
  fieldId: string;
  label: string;
  help: string;
  placeholder?: string;
  kind: "short" | "long" | "choice";
  options?: { id: string; label: string; detail?: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const inputId = `${project.id}-${fieldId}`;
  const pace = fieldId === "sizeBand" ? paceNote(project) : null;
  const length = fieldId === "wordTarget" ? lengthVerdict(project) : null;
  const must = fieldId === "price" ? priceMust(value) : "";
  const pillarCount = fieldId === "pillars" ? linesOf(value).length : 0;
  const hookWords = fieldId === "eightWords" ? wordCount(value) : 0;

  return (
    <div>
      {kind === "choice" ? (
        <div>
          <p id={`${inputId}-label`} className="font-medium">
            {label}
          </p>
          <p id={`${inputId}-help`} className="mt-1 text-sm text-pretty text-muted">
            {help}
          </p>
          <div
            role="radiogroup"
            aria-labelledby={`${inputId}-label`}
            className={cn("mt-3 grid gap-2", fieldId === "emotion" && "sm:grid-cols-2")}
          >
            {options?.map((option) => {
              const selected = value === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onChange(option.id)}
                  className={cn(
                    "min-h-11 rounded-md border px-3 py-3 text-left",
                    selected ? "border-ink bg-ink text-paper" : "border-line bg-card hover:border-ink",
                  )}
                >
                  <span className="block font-medium">{option.label}</span>
                  {option.detail ? (
                    <span className={cn("mt-1 block text-sm text-pretty", selected ? "text-wax-ink" : "text-muted")}>
                      {option.detail}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <label htmlFor={inputId} className="block">
          <span className="font-medium">{label}</span>
          <span className="mt-1 block text-sm text-pretty text-muted">{help}</span>
          {kind === "long" ? (
            <textarea
              id={inputId}
              value={value}
              placeholder={placeholder}
              onChange={(event) => onChange(event.target.value)}
              rows={5}
              className="mt-3 w-full resize-y rounded-md border border-line bg-card px-3 py-3 text-base text-ink placeholder:text-muted"
            />
          ) : (
            <input
              id={inputId}
              value={value}
              placeholder={placeholder}
              inputMode={fieldId === "wordTarget" ? "numeric" : undefined}
              onChange={(event) => onChange(event.target.value)}
              className="mt-3 min-h-11 w-full rounded-md border border-line bg-card px-3 text-base text-ink placeholder:text-muted"
            />
          )}
        </label>
      )}

      {fieldId === "eightWords" && hookWords > 0 ? (
        <p className={cn("mt-2 text-sm tabular-nums", hookWords > 8 ? "text-wax-deep" : "text-muted")}>
          {hookWords} / 8 words
        </p>
      ) : null}
      {fieldId === "pillars" && pillarCount > 0 ? (
        <p className={cn("mt-2 text-sm", pillarCount === 3 ? "text-muted" : "text-wax-deep")}>
          {pillarCount} / 3 pillars
          {pillarCount > 3 ? ". They stop cutting features above three." : ""}
        </p>
      ) : null}
      {pace ? <p className={cn("mt-3 text-sm text-pretty", pace.problem ? "text-wax-deep" : "text-muted")}>{pace.text}</p> : null}
      {length ? (
        <p className={cn("mt-2 text-sm text-pretty", length.level === "ok" ? "text-muted" : "text-wax-deep")}>
          {length.text}
        </p>
      ) : null}
      {must ? <p className="mt-3 text-sm text-pretty text-ink">You owe: {must}</p> : null}
    </div>
  );
}

function MarketList({ project }: { project: Project }) {
  const items = marketableItems(project);
  const ready = items.filter((item) => item.ok).length;
  return (
    <section className="mt-10 border-t border-line pt-8">
      <h2 className="font-display text-2xl">Sellable when</h2>
      <p className="mt-2 text-sm text-pretty text-muted">
        {ready} of {items.length}. This is the end result, not a vibe. Unchecked lines are still scope or still missing.
      </p>
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item.id} className="flex min-h-11 items-start gap-3 border-t border-line py-3">
            <span
              className={cn("mt-1 size-2.5 shrink-0 rounded-full", item.ok ? "bg-ink" : "bg-wax")}
              aria-hidden
            />
            <span className={cn(item.ok ? "text-ink" : "text-muted")}>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
