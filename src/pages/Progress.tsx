import { useState, useMemo } from "react";
import { getDayLogs, getActivities, getDisciplines } from "../store";
import StatRadar from "../page-components/progress/StatRadar";
import CumulativeChart from "../page-components/progress/CumulativeChart";
import DisciplineCharts from "../page-components/progress/DisciplineCharts";

function Progress() {
  const [logs] = useState(getDayLogs());
  const [activities] = useState(getActivities());
  const [disciplines] = useState(getDisciplines());

  const chartData = useMemo(() => {
    const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));

    const cumulative: Record<string, number> = {};
    disciplines.forEach((d) => {
      cumulative[d.id] = 0;
    });

    return sorted.map((log) => {
      const [year, month, day] = log.date.split("-").map(Number);
      const label = new Date(year, month - 1, day).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "short",
      });

      const point: Record<string, number | string> = { date: label };

      disciplines.forEach((discipline) => {
        const dayXP = log.entries.reduce((sum, entry) => {
          const activity = activities.find(
            (a) =>
              a.id === entry.activityId && a.disciplineId === discipline.id,
          );
          return sum + (activity ? activity.points * entry.count : 0);
        }, 0);
        cumulative[discipline.id] += dayXP;
        point[discipline.id] = cumulative[discipline.id];
      });

      return point;
    });
  }, [logs, activities, disciplines]);

  if (logs.length === 0) {
    return (
      <main className="pb-20 pt-4 px-4 flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-sm">
          Ancora nessun dato, inizia a tracciare i tuoi progressi nella tab
          "Oggi"
        </p>
      </main>
    );
  }

  return (
    <main className="pb-20 pt-4 px-4">
      <h1 className="text-white font-bold text-xl mb-6">Progress</h1>
      <StatRadar chartData={chartData} disciplines={disciplines} />
      <CumulativeChart chartData={chartData} disciplines={disciplines} />
      <DisciplineCharts chartData={chartData} disciplines={disciplines} />
    </main>
  );
}

export default Progress;
