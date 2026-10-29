import { useState } from "react";
import { shipCap } from "@/lib/checks";
import { LIST_COPY } from "@/lib/framework";
import { liveLines, type Project } from "@/lib/model";
import { useDesk } from "@/lib/store";
import { cn } from "@/lib/cn";

export function ScopeMeter({ project, compact = false }: { project: Project; compact?: boolean }) {
  const cap = shipCap(project);
  const count = liveLines(project.ship).length;
  const parked = liveLines(project.dream).length;
  const over = cap !== null && count > cap;
  const width = cap ? Math.min(100, Math.round((count / cap) * 100)) : 0;

  if (compact) {
    return (
      <span className={cn("tabular-nums", over && "font-semibold text-wax-deep")}>
        Ship {count}
        {cap !== null ? `/${cap}` : ""}
        {parked ? ` · ${parked} parked` : ""}
      </span>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium">{LIST_COPY[project.medium].ship}</p>
        <p className={cn("text-sm tabular-nums", over ? "font-semibold text-wax-deep" : "text-muted")}>
          {cap === null ? count : `${count} / ${cap}`}
        </p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-2">
        <div className={cn("h-full", over ? "bg-wax" : "bg-ink")} style={{ width: `${cap === null ? 0 : width}%` }} />
      </div>
      <p className="mt-2 text-sm text-pretty text-muted">
        {cap === null
          ? "Pick a finishable band and this list gets a limit."
          : over
            ? "Over the band. Park or cut before you call this a plan."
            : `${parked} parked on the dream list, where they cannot quietly become tasks.`}
      </p>
    </div>
  );
}

export function ScopeLists({ project }: { project: Project }) {
  const addLine = useDesk((state) => state.addLine);
  const updateLine = useDesk((state) => state.updateLine);
  const removeLine = useDesk((state) => state.removeLine);
  const moveLine = useDesk((state) => state.moveLine);
  const addKill = useDesk((state) => state.addKill);
  const updateKill = useDesk((state) => state.updateKill);
  const removeKill = useDesk((state) => state.removeKill);
  const copy = LIST_COPY[project.medium];
  const cap = shipCap(project);
  const count = liveLines(project.ship).length;
  const over = cap !== null && count >= cap;

  return (
    <div className="space-y-8 border-t border-line pt-8">
      <ListEditor
        title={copy.ship}
        help={copy.shipHelp}
        warn={over ? "You are at the cap. Add only if you park something else." : undefined}
        items={project.ship}
        actionLabel="Park"
        onAdd={(text) => addLine(project.id, "ship", text)}
        onChange={(lineId, text) => updateLine(project.id, "ship", lineId, text)}
        onRemove={(lineId) => removeLine(project.id, "ship", lineId)}
        onMove={(lineId) => moveLine(project.id, "ship", lineId)}
      />
      <ListEditor
        title={copy.dream}
        help={copy.dreamHelp}
        items={project.dream}
        actionLabel="Promote"
        quiet
        onAdd={(text) => addLine(project.id, "dream", text)}
        onChange={(lineId, text) => updateLine(project.id, "dream", lineId, text)}
        onRemove={(lineId) => removeLine(project.id, "dream", lineId)}
        onMove={(lineId) => moveLine(project.id, "dream", lineId)}
      />
      <KillEditor
        items={project.kills}
        onAdd={(what, why) => addKill(project.id, what, why)}
        onChange={(killId, patch) => updateKill(project.id, killId, patch)}
        onRemove={(killId) => removeKill(project.id, killId)}
      />
    </div>
  );
}

function ListEditor({
  title,
  help,
  warn,
  items,
  actionLabel,
  quiet,
  onAdd,
  onChange,
  onRemove,
  onMove,
}: {
  title: string;
  help: string;
  warn?: string;
  items: { id: string; text: string }[];
  actionLabel: string;
  quiet?: boolean;
  onAdd: (text: string) => void;
  onChange: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string) => void;
}) {
  const [text, setText] = useState("");
  return (
    <section className={cn(quiet && "bg-paper-2 px-4 py-4")}>
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-1 text-sm text-pretty text-muted">{help}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={item.id} className="border-b border-line pb-3">
            <div className="flex items-start gap-2">
              <span className="mt-3 w-6 shrink-0 text-sm tabular-nums text-muted">{index + 1}</span>
              <input
                value={item.text}
                onChange={(event) => onChange(item.id, event.target.value)}
                aria-label={`${title} item ${index + 1}`}
                className="min-h-11 min-w-0 w-full rounded-md border border-line bg-card px-3 text-base text-ink"
              />
            </div>
            <div className="mt-2 flex gap-2 pl-8">
              <button
                type="button"
                onClick={() => onMove(item.id)}
                className="min-h-11 rounded-md border border-line px-3 text-sm hover:border-ink"
              >
                {actionLabel}
              </button>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.text || "item"}`}
                className="min-h-11 rounded-md px-3 text-sm text-muted hover:text-ink"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form
        className="mt-3 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          const next = text.trim();
          if (!next) return;
          onAdd(next);
          setText("");
        }}
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add one concrete thing"
          aria-label={`Add to ${title}`}
          className="min-h-11 w-full rounded-md border border-line bg-card px-3 text-base placeholder:text-muted"
        />
        <button type="submit" className="min-h-11 shrink-0 rounded-md bg-ink px-4 text-base font-medium text-paper">
          Add
        </button>
      </form>
      {warn ? <p className="mt-2 text-sm text-wax-deep">{warn}</p> : null}
    </section>
  );
}

function KillEditor({
  items,
  onAdd,
  onChange,
  onRemove,
}: {
  items: { id: string; what: string; why: string }[];
  onAdd: (what: string, why: string) => void;
  onChange: (id: string, patch: { what?: string; why?: string }) => void;
  onRemove: (id: string) => void;
}) {
  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  return (
    <section>
      <h3 className="font-display text-2xl">Cuts</h3>
      <p className="mt-1 text-sm text-pretty text-muted">
        A cut without a reason comes back. Write why the plan is better without it.
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="border border-line bg-card p-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-semibold tracking-widest text-wax-deep">CUT</p>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="min-h-11 text-sm text-muted hover:text-ink"
              >
                Remove
              </button>
            </div>
            <input
              value={item.what}
              onChange={(event) => onChange(item.id, { what: event.target.value })}
              aria-label="What was cut"
              className="mt-1 w-full bg-transparent text-base font-medium text-ink"
            />
            <input
              value={item.why}
              onChange={(event) => onChange(item.id, { why: event.target.value })}
              aria-label="Why it was cut"
              className="mt-1 w-full bg-transparent text-sm text-muted"
            />
          </li>
        ))}
      </ul>
      <form
        className="mt-3 space-y-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (!what.trim() || !why.trim()) return;
          onAdd(what.trim(), why.trim());
          setWhat("");
          setWhy("");
        }}
      >
        <input
          value={what}
          onChange={(event) => setWhat(event.target.value)}
          placeholder="What are you refusing?"
          aria-label="Cut"
          className="min-h-11 w-full rounded-md border border-line bg-card px-3 text-base placeholder:text-muted"
        />
        <input
          value={why}
          onChange={(event) => setWhy(event.target.value)}
          placeholder="Why is the plan better without it?"
          aria-label="Reason for the cut"
          className="min-h-11 w-full rounded-md border border-line bg-card px-3 text-base placeholder:text-muted"
        />
        <button type="submit" className="min-h-11 rounded-md border border-ink px-4 text-base font-medium">
          Record the cut
        </button>
      </form>
    </section>
  );
}
