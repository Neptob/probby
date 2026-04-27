import type { DayLog, Discipline, Activity } from '../../types'

type DayCardProps = {
  log: DayLog
  disciplines: Discipline[]
  activities: Activity[]
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('it-IT', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

function getDayTotal(log: DayLog, activities: Activity[]): number {
  return log.entries.reduce((sum, entry) => {
    const activity = activities.find(a => a.id === entry.activityId)
    return sum + (activity ? activity.points * entry.count : 0)
  }, 0)
}

function getDisciplineTotal(log: DayLog, activities: Activity[], disciplineId: string): number {
  return log.entries.reduce((sum, entry) => {
    const activity = activities.find(
      a => a.id === entry.activityId && a.disciplineId === disciplineId
    )
    return sum + (activity ? activity.points * entry.count : 0)
  }, 0)
}

function DayCard({ log, disciplines, activities }: DayCardProps) {
  const total = getDayTotal(log, activities)

  return (
    <div className="mb-4 bg-gray-900 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-400 text-sm">{formatDate(log.date)}</span>
        <span className={`font-bold text-sm ${total >= 0 ? 'text-amber-400' : 'text-red-400'}`}>
          {total > 0 ? '+' : ''}{total} XP
        </span>
      </div>

      <div className="space-y-1">
        {disciplines.map(discipline => {
          const disciplineTotal = getDisciplineTotal(log, activities, discipline.id)
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
}

export default DayCard
