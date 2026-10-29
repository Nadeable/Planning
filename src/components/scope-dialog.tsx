import { useEffect, useRef, useState } from "react";
import { shipCap } from "@/lib/checks";
import { liveLines, type Project } from "@/lib/model";
import { useDesk } from "@/lib/store";

export function ScopeDialog({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) {
  const addLine = useDesk((state) => state.addLine);
  const addKill = useDesk((state) => state.addKill);
  const whatRef = useRef<HTMLInputElement>(null);
  const [what, setWhat] = useState("");
  const [serves, setServes] = useState("");
  const [why, setWhy] = useState("");
  const [error, setError] = useState("");

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    setWhat("");
    setServes("");
    setWhy("");
    setError("");
    const frame = window.requestAnimationFrame(() => whatRef.current?.focus());
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const cap = shipCap(project);
  const count = liveLines(project.ship).length;
  const over = cap !== null && count >= cap;
  const noun = project.medium === "game" ? "a pillar" : "the protagonist's want";

  function park() {
    if (!what.trim()) {
      setError("Name the thing first.");
      return;
    }
    addLine(project.id, "dream", what.trim());
    onClose();
  }

  function cut() {
    if (!what.trim() || !why.trim()) {
      setError("A cut needs the thing and the reason. Otherwise it comes back.");
      return;
    }
    addKill(project.id, what.trim(), why.trim());
    onClose();
  }

  function ship() {
    if (!what.trim()) {
      setError("Name the thing first.");
      return;
    }
    if (!serves.trim()) {
      setError(`Say which ${noun} it serves. If you can't, park it.`);
      return;
    }
    addLine(project.id, "ship", `${what.trim()} — serves ${serves.trim()}`);
    onClose();
  }

  return (
    <div className="no-print fixed inset-0 z-30 flex items-end justify-center bg-ink/50 sm:items-center sm:p-6">
      <button type="button" aria-label="Close scope check" className="absolute inset-0" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="scope-title"
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto border border-ink bg-paper p-5 sm:p-6"
      >
        <p className="text-xs font-semibold tracking-widest text-wax-deep">SCOPE CHECK</p>
        <h2 id="scope-title" className="mt-2 font-display text-3xl text-balance">
          Before it enters the plan
        </h2>
        <p className="mt-2 text-pretty text-muted">
          Name it. Then decide if it is the {project.medium === "game" ? "game" : "book"} you are actually making.
          Most things are not.
        </p>
        <label className="mt-5 block">
          <span className="font-medium">What do you want to add?</span>
          <input
            ref={whatRef}
            value={what}
            onChange={(event) => setWhat(event.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-line bg-card px-3 text-base"
          />
        </label>
        <label className="mt-4 block">
          <span className="font-medium">What does it serve?</span>
          <span className="mt-1 block text-sm text-muted">
            {project.medium === "game" ? "A pillar, or the verb." : "The protagonist's want, or the ending."} If this
            stays blank, it does not ship.
          </span>
          <input
            value={serves}
            onChange={(event) => setServes(event.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-line bg-card px-3 text-base"
          />
        </label>
        <label className="mt-4 block">
          <span className="font-medium">If you cut it, why is the plan better?</span>
          <input
            value={why}
            onChange={(event) => setWhy(event.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-line bg-card px-3 text-base"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-wax-deep">{error}</p> : null}
        <div className="mt-5 flex flex-col gap-2">
          <button type="button" onClick={park} className="min-h-11 rounded-md bg-ink px-4 font-medium text-paper">
            Park it on the dream list
          </button>
          <button type="button" onClick={cut} className="min-h-11 rounded-md border border-ink px-4 font-medium">
            Cut it
          </button>
          <button
            type="button"
            onClick={ship}
            className="min-h-11 rounded-md border border-wax px-4 font-medium text-wax-deep"
          >
            {over ? "Ship it anyway — this flags the plan" : "Put it on the ship list"}
          </button>
        </div>
      </div>
    </div>
  );
}
