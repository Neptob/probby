export type Discipline = {
  id: string;
  name: string;
  color: string;
};

export type Activity = {
  id: string;
  disciplineId: string;
  name: string;
  points: number;
  hasCounter: boolean;
};

export type ActivityEntry = {
  activityId: string;
  count: number;
};

export type DayLog = {
  date: string;
  entries: ActivityEntry[];
};

export type UserProfile = {
  name: string;
  startDate: string;
};
