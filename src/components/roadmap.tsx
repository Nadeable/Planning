import { findings } from "@/lib/checks";
import { PHASES, taskKey } from "@/lib/framework";
import type { Project } from "@/lib/model";
import { useDesk } from "@/lib/store";
import { cn } from "@/lib/cn";

export function Roadmap({ project }: { project: Project }) {
  const toggleTask = useDesk((state) => state.toggleTask);
  const setPhaseNote = useDesk((state) => state.setPhaseNote);
  const phases = PHASES[project.medium];
  const edge = phases.find((phase) => phase.tasks.some((task) => !project.tasks[taskKey(phase.id, task.id)]));
  const blocked = findings(project).some((finding) => finding.level === "block" && finding.stage === "scale");

  return (
    <div>
      {blocked ? (
        <p className="border border-wax bg-wax-soft px-4 py-3 text-sm text-ink">
          This roadmap is fiction until the scale gate is honest. Hours, a finishable band, and a ship list that fits
          come first.
        </p>
      ) : null}
      <ol className={cn(blocked && "mt-2")}>
        {phases.map((phase, index) => {
          const here = edge?.id === phase.id;
          const done = phase.tasks.filter((task) => project.tasks[taskKey(phase.id, task.id)]).length;
          return (
            <li key={phase.id} className="border-t border-line py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl text-balance">
                  <span className="mr-2 text-muted tabular-nums">{index + 1}</span>
                  {phase.name}
                </h3>
                <p className={cn("text-xs font-semibold tracking-widest", here ? "text-wax-deep" : "text-muted")}>
                  {here ? "YOU ARE HERE" : `${done}/${phase.tasks.length}`}
                </p>
              </div>
              <p className="mt-2 max-w-xl text-pretty text-muted">{phase.intent}</p>
              <div className="mt-4 border border-ink bg-card px-4 py-3">
                <p className="text-xs font-semibold tracking-widest text-muted">EXIT</p>
                <p className="mt-1 text-pretty">{phase.exit}</p>
              </div>
              <ul className="mt-4">
                {phase.tasks.map((task) => {
                  const key = taskKey(phase.id, task.id);
                  const checked = Boolean(project.tasks[key]);
                  return (
                    <li key={key}>
                      <label className="flex min-h-11 items-start gap-3 py-1">
                        <input
                          type="checkbox"
                          className="mt-1 size-5 shrink-0 accent-ink"
                          checked={checked}
                          onChange={() => toggleTask(project.id, key)}
                        />
                        <span className={cn("pt-0.5", checked && "text-muted")}>{task.label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <label className="mt-4 block">
                <span className="text-sm text-muted">Note for this phase</span>
                <textarea
                  value={project.phaseNotes[phase.id] ?? ""}
                  onChange={(event) => setPhaseNote(project.id, phase.id, event.target.value)}
                  rows={2}
                  placeholder="What did this phase decide? Optional."
                  className="mt-2 w-full resize-y rounded-md border border-line bg-card px-3 py-2.5 text-base text-ink placeholder:text-muted"
                />
              </label>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
