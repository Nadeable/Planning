import { create } from "zustand";
import { persist } from "zustand/middleware";
import { exampleProjects } from "@/lib/examples";
import type { Kill, Line, Medium, Project } from "@/lib/model";

type ListKey = "ship" | "dream";

type DeskState = {
  seeded: boolean;
  projects: Project[];
  afterLoad: () => void;
  create: (medium: Medium) => string;
  duplicate: (id: string) => string | null;
  remove: (id: string) => void;
  setTitle: (id: string, title: string) => void;
  setStage: (id: string, stage: string) => void;
  setAnswer: (id: string, key: string, value: string) => void;
  addLine: (id: string, key: ListKey, text: string) => void;
  updateLine: (id: string, key: ListKey, lineId: string, text: string) => void;
  removeLine: (id: string, key: ListKey, lineId: string) => void;
  moveLine: (id: string, from: ListKey, lineId: string) => void;
  addKill: (id: string, what: string, why: string) => void;
  updateKill: (id: string, killId: string, patch: Partial<Pick<Kill, "what" | "why">>) => void;
  removeKill: (id: string, killId: string) => void;
  toggleTask: (id: string, key: string) => void;
  setPhaseNote: (id: string, phaseId: string, note: string) => void;
};

function uid(): string {
  return crypto.randomUUID();
}

function normalize(project: Project): Project {
  return {
    ...project,
    stage: project.stage || "spark",
    answers: project.answers ?? {},
    ship: project.ship ?? [],
    dream: project.dream ?? [],
    kills: project.kills ?? [],
    tasks: project.tasks ?? {},
    phaseNotes: project.phaseNotes ?? {},
  };
}

function mapProject(projects: Project[], id: string, fn: (project: Project) => Project): Project[] {
  return projects.map((project) => (project.id === id ? { ...fn(project), updatedAt: Date.now() } : project));
}

export const useDesk = create<DeskState>()(
  persist(
    (set, get) => ({
      seeded: false,
      projects: [],
      afterLoad: () => {
        set((state) => {
          const projects = state.projects.map(normalize);
          if (state.seeded) return { projects };
          return { seeded: true, projects: [...exampleProjects(), ...projects] };
        });
      },
      create: (medium) => {
        const id = uid();
        const now = Date.now();
        const project: Project = {
          id,
          medium,
          title: medium === "game" ? "Untitled game" : "Untitled book",
          createdAt: now,
          updatedAt: now,
          stage: "spark",
          answers: {},
          ship: [],
          dream: [],
          kills: [],
          tasks: {},
          phaseNotes: {},
        };
        set((state) => ({ projects: [project, ...state.projects] }));
        return id;
      },
      duplicate: (id) => {
        const source = get().projects.find((project) => project.id === id);
        if (!source) return null;
        const copy = structuredClone(source);
        const now = Date.now();
        copy.id = uid();
        copy.example = false;
        copy.title = `Copy of ${source.title}`;
        copy.createdAt = now;
        copy.updatedAt = now;
        set((state) => ({ projects: [copy, ...state.projects] }));
        return copy.id;
      },
      remove: (id) => set((state) => ({ projects: state.projects.filter((project) => project.id !== id) })),
      setTitle: (id, title) => set((state) => ({ projects: mapProject(state.projects, id, (project) => ({ ...project, title })) })),
      setStage: (id, stage) =>
        set((state) => ({ projects: mapProject(state.projects, id, (project) => ({ ...project, stage })) })),
      setAnswer: (id, key, value) =>
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => ({
            ...project,
            answers: { ...project.answers, [key]: value },
          })),
        })),
      addLine: (id, key, text) => {
        const line: Line = { id: uid(), text };
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => ({
            ...project,
            [key]: [...project[key], line],
          })),
        }));
      },
      updateLine: (id, key, lineId, text) =>
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => ({
            ...project,
            [key]: project[key].map((line) => (line.id === lineId ? { ...line, text } : line)),
          })),
        })),
      removeLine: (id, key, lineId) =>
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => ({
            ...project,
            [key]: project[key].filter((line) => line.id !== lineId),
          })),
        })),
      moveLine: (id, from, lineId) =>
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => {
            const line = project[from].find((item) => item.id === lineId);
            if (!line) return project;
            const to: ListKey = from === "ship" ? "dream" : "ship";
            return {
              ...project,
              [from]: project[from].filter((item) => item.id !== lineId),
              [to]: [...project[to], line],
            };
          }),
        })),
      addKill: (id, what, why) => {
        const kill: Kill = { id: uid(), what, why };
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => ({ ...project, kills: [...project.kills, kill] })),
        }));
      },
      updateKill: (id, killId, patch) =>
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => ({
            ...project,
            kills: project.kills.map((kill) => (kill.id === killId ? { ...kill, ...patch } : kill)),
          })),
        })),
      removeKill: (id, killId) =>
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => ({
            ...project,
            kills: project.kills.filter((kill) => kill.id !== killId),
          })),
        })),
      toggleTask: (id, key) =>
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => ({
            ...project,
            tasks: { ...project.tasks, [key]: !project.tasks[key] },
          })),
        })),
      setPhaseNote: (id, phaseId, note) =>
        set((state) => ({
          projects: mapProject(state.projects, id, (project) => ({
            ...project,
            phaseNotes: { ...project.phaseNotes, [phaseId]: note },
          })),
        })),
    }),
    { name: "scopewright.v1", skipHydration: true },
  ),
);
