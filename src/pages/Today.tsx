import { useState } from 'react'
import { getDisciplines, getActivities, getTodayLog, saveTodayLog } from '../store'
import type { ActivityEntry } from '../types'
import DisciplineSection from '../page-components/today/DisciplineSection'

function Today() {
  const [disciplines] = useState(getDisciplines())
  const [activities] = useState(getActivities())
  const [log, setLog] = useState(getTodayLog())

  function getEntry(activityId: string): ActivityEntry | undefined {
    return log.entries.find(e => e.activityId === activityId)
  }

  function updateEntry(activityId: string, count: number) {
    const newEntries = count <= 0
      ? log.entries.filter(e => e.activityId !== activityId)
      : log.entries.some(e => e.activityId === activityId)
        ? log.entries.map(e => e.activityId === activityId ? { ...e, count } : e)
        : [...log.entries, { activityId, count }]

    const newLog = { ...log, entries: newEntries }
    setLog(newLog)
    saveTodayLog(newLog)
  }

  function toggle(activityId: string) {
    const entry = getEntry(activityId)
    updateEntry(activityId, entry ? 0 : 1)
  }

  function increment(activityId: string) {
    updateEntry(activityId, (getEntry(activityId)?.count ?? 0) + 1)
  }

  function decrement(activityId: string) {
    updateEntry(activityId, (getEntry(activityId)?.count ?? 0) - 1)
  }

  const dailyTotal = activities.reduce((sum, activity) => {
    const entry = getEntry(activity.id)
    return sum + (entry ? activity.points * entry.count : 0)
  }, 0)

  return (
    <main className="pb-20 pt-4 px-4">
      <h1 className="text-white font-bold text-xl mb-4">
        {new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/\b\w/g, c => c.toUpperCase())}
      </h1>

      {disciplines.map(discipline => (
        <DisciplineSection
          key={discipline.id}
          discipline={discipline}
          activities={activities.filter(a => a.disciplineId === discipline.id)}
          getEntry={getEntry}
          onToggle={toggle}
          onIncrement={increment}
          onDecrement={decrement}
        />
      ))}

      <div className="fixed bottom-16 left-0 right-0 px-4 py-2 bg-gray-900 border-t border-gray-800 flex justify-between items-center">
        <span className="text-gray-400 text-sm">Totale giornata</span>
        <span className={`font-bold ${dailyTotal >= 0 ? 'text-amber-400' : 'text-red-400'}`}>
          {dailyTotal > 0 ? '+' : ''}{dailyTotal} XP
        </span>
      </div>
    </main>
  )
}

export default Today
