import { useState, useMemo } from "react";
import { getUserProfile, getDayLogs, getActivities } from "../store";
import type { DayLog, Activity } from "../types";

function calculateTotalXP(logs: DayLog[], activities: Activity[]): number {
  return Math.max(
    0,
    logs
      .flatMap((log) => log.entries)
      .reduce((sum, entry) => {
        const activity = activities.find((a) => a.id === entry.activityId);
        return sum + (activity ? activity.points * entry.count : 0);
      }, 0),
  );
}

function getLevelInfo(totalXP: number) {
  let level = 1;
  let accumulated = 0;
  while (true) {
    const xpForThisLevel = Math.floor(100 * Math.pow(1.5, level - 1));
    if (accumulated + xpForThisLevel > totalXP) {
      return {
        level,
        currentXP: totalXP - accumulated,
        xpNeeded: xpForThisLevel,
      };
    }
    accumulated += xpForThisLevel;
    level++;
  }
}

function Header() {
  const [profile] = useState(getUserProfile());
  const [logs] = useState(getDayLogs());
  const [activities] = useState(getActivities());

  const totalXP = useMemo(
    () => calculateTotalXP(logs, activities),
    [logs, activities],
  );

  const { level, currentXP, xpNeeded } = useMemo(
    () => getLevelInfo(totalXP),
    [totalXP],
  );

  const progress = Math.round((currentXP / xpNeeded) * 100);

  return (
    <header className="flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-gray-800">
      <div
        className="w-10 h-10 flex items-center justify-center bg-amber-400 text-gray-900 font-bold text-sm shrink-0"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {level}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">
          {profile.name || "Adventurer"}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-gray-400 text-xs shrink-0">
            {currentXP}/{xpNeeded} XP
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
