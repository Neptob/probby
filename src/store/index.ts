import type { Discipline, Activity, DayLog, UserProfile } from "../types";
import { DEFAULT_DISCIPLINES, DEFAULT_ACTIVITIES } from "./defaults";

const KEYS = {
  disciplines: "probby_disciplines",
  activities: "probby_activities",
  dayLogs: "probby_day_logs",
  userProfile: "probby_user_profile",
};

// disciplines

export function getDisciplines(): Discipline[] {
  const raw = localStorage.getItem(KEYS.disciplines);
  if (raw === null) return DEFAULT_DISCIPLINES;
  return JSON.parse(raw) as Discipline[];
}

export function saveDisciplines(disciplines: Discipline[]): void {
  localStorage.setItem(KEYS.disciplines, JSON.stringify(disciplines));
}

// activities

export function getActivities(): Activity[] {
  const raw = localStorage.getItem(KEYS.activities);
  if (raw === null) return DEFAULT_ACTIVITIES;
  return JSON.parse(raw) as Activity[];
}

export function saveActivities(activities: Activity[]): void {
  localStorage.setItem(KEYS.activities, JSON.stringify(activities));
}

// daylogs

export function getDayLogs(): DayLog[] {
  const raw = localStorage.getItem(KEYS.dayLogs);
  if (raw === null) return [];
  return JSON.parse(raw) as DayLog[];
}

export function saveDayLogs(logs: DayLog[]): void {
  localStorage.setItem(KEYS.dayLogs, JSON.stringify(logs));
}

// user

export function getUserProfile(): UserProfile {
  const raw = localStorage.getItem(KEYS.userProfile);
  if (raw === null)
    return { name: "", startDate: new Date().toISOString().split("T")[0] };
  return JSON.parse(raw) as UserProfile;
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(KEYS.userProfile, JSON.stringify(profile));
}

// logs

export function getTodayLog(): DayLog {
  const today = new Date().toISOString().split("T")[0];
  const logs = getDayLogs();
  const existing = logs.find((log) => log.date === today);
  if (existing) return existing;
  return { date: today, entries: [] };
}

export function saveTodayLog(log: DayLog): void {
  const logs = getDayLogs();
  const index = logs.findIndex((l) => l.date === log.date);
  if (index >= 0) {
    logs[index] = log;
  } else {
    logs.push(log);
  }
  saveDayLogs(logs);
}

// save/load data

export function exportData(): void {
  const data = {
    disciplines: getDisciplines(),
    activities: getActivities(),
    dayLogs: getDayLogs(),
    userProfile: getUserProfile(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "probby-backup.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function importData(json: string): void {
  const data = JSON.parse(json);
  if (data.disciplines) saveDisciplines(data.disciplines);
  if (data.activities) saveActivities(data.activities);
  if (data.dayLogs) saveDayLogs(data.dayLogs);
  if (data.userProfile) saveUserProfile(data.userProfile);
}
