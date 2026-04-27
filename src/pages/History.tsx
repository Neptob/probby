import { useState, useMemo } from 'react'
import { getDayLogs, getActivities, getDisciplines } from '../store'
import type { DayLog } from '../types'

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('it-IT', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

function History() {
  const [logs] = useState(getDayLogs())
  const [activities] = useState(getActivities())
  const [disciplines] = useState(getDisciplines())

  const sortedLogs = useMemo(
    () => [...logs].sort((a, b) => b.date.localeCompare(a.date)),
    [logs]
  )

  function getDayTotal(log: DayLog): number {
    return log.entries.reduce((sum, entry) => {
      const activity = activities.find(a => a.id === entry.activityId)
      return sum + (activity ? activity.points * entry.count : 0)
    }, 0)
  }

  function getDisciplineTotal(log: DayLog, disciplineId: string): number {
    return log.entries.reduce((sum, entry) => {
      const activity = activities.find(a => a.id === entry.activityId && a.disciplineId === disciplineId)
      return sum + (activity ? activity.points * entry.count : 0)
    }, 0)
  }

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

      {sortedLogs.map(log => {
        const total = getDayTotal(log)

        return (
          <div key={log.date} className="mb-4 bg-gray-900 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400 text-sm">{formatDate(log.date)}</span>
              <span className={`font-bold text-sm ${total >= 0 ? 'text-amber-400' : 'text-red-400'}`}>
                {total > 0 ? '+' : ''}{total} XP
              </span>
            </div>

            <div className="space-y-1">
              {disciplines.map(discipline => {
                const disciplineTotal = getDisciplineTotal(log, discipline.id)
                if (disciplineTotal === 0) return null

                return (
                  <div key={discipline.id} className="flex items-center gap-2">
                    <span className="text-xs w-16 shrink-0" style={{ color: discipline.color }}>
                      {discipline.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {disciplineTotal > 0 ? '+' : ''}{disciplineTotal}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </main>
  )
}

export default History
