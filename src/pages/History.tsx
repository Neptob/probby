import { useState, useMemo } from 'react'
import { getDayLogs, getActivities, getDisciplines } from '../store'
import DayCard from '../page-components/history/DayCard'

function History() {
  const [logs] = useState(getDayLogs())
  const [activities] = useState(getActivities())
  const [disciplines] = useState(getDisciplines())

  const sortedLogs = useMemo(
    () => [...logs].sort((a, b) => b.date.localeCompare(a.date)),
    [logs]
  )

  if (sortedLogs.length === 0) {
    return (
      <main className="pb-20 pt-4 px-4 flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-sm">Nessun giorno registrato ancora.</p>
      </main>
    )
  }

  return (
    <main className="pb-20 pt-4 px-4">
      <h1 className="text-white font-bold text-xl mb-4">History</h1>

      {sortedLogs.map(log => (
        <DayCard key={log.date} log={log} disciplines={disciplines} activities={activities} />
      ))}
    </main>
  )
}

export default History
