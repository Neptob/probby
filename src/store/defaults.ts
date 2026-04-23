import type { Discipline, Activity } from "../types";

export const DEFAULT_DISCIPLINES: Discipline[] = [
  { id: "physical", name: "Fisico", color: "#e74c3c" },
  { id: "mind", name: "Mente", color: "#3b82f6" },
  { id: "charm", name: "Charm", color: "#a855f7" },
  { id: "spirit", name: "Spirito", color: "#22c55e" },
];

export const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: "running",
    disciplineId: "physical",
    name: "Corsa",
    points: 1,
    isPenalty: false,
  },
  {
    id: "gym",
    disciplineId: "physical",
    name: "Palestra / Calisthenics",
    points: 1,
    isPenalty: false,
  },
  {
    id: "abs",
    disciplineId: "physical",
    name: "Addominali",
    points: 1,
    isPenalty: false,
  },
  {
    id: "stretching",
    disciplineId: "physical",
    name: "Stretching",
    points: 1,
    isPenalty: false,
  },
  {
    id: "cheat",
    disciplineId: "physical",
    name: "Sgarro",
    points: -1,
    isPenalty: true,
  },

  {
    id: "reading",
    disciplineId: "mind",
    name: "Lettura 30 min",
    points: 2,
    isPenalty: false,
  },
  {
    id: "deep-work",
    disciplineId: "mind",
    name: "Deep work 90 min",
    points: 3,
    isPenalty: false,
  },
  {
    id: "language",
    disciplineId: "mind",
    name: "Pratica lingua",
    points: 2,
    isPenalty: false,
  },
  {
    id: "doomscroll",
    disciplineId: "mind",
    name: "Doomscroll",
    points: -2,
    isPenalty: true,
  },

  {
    id: "diction",
    disciplineId: "charm",
    name: "Dizione",
    points: 1,
    isPenalty: false,
  },
  {
    id: "expressions",
    disciplineId: "charm",
    name: "Espressioni facciali",
    points: 1,
    isPenalty: false,
  },
  {
    id: "dancing",
    disciplineId: "charm",
    name: "Ballo",
    points: 1,
    isPenalty: false,
  },
  {
    id: "singing",
    disciplineId: "charm",
    name: "Canto",
    points: 1,
    isPenalty: false,
  },
  {
    id: "guitar",
    disciplineId: "charm",
    name: "Chitarra / Piano",
    points: 1,
    isPenalty: false,
  },
  {
    id: "driving-license",
    disciplineId: "charm",
    name: "Patente (1h o quiz)",
    points: 1,
    isPenalty: false,
  },

  {
    id: "meditation",
    disciplineId: "spirit",
    name: "Meditazione",
    points: 2,
    isPenalty: false,
  },
  {
    id: "journaling",
    disciplineId: "spirit",
    name: "Journaling",
    points: 1,
    isPenalty: false,
  },
  {
    id: "nature",
    disciplineId: "spirit",
    name: "Tempo in natura",
    points: 1,
    isPenalty: false,
  },
];
