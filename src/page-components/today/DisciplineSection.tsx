import type { Discipline, Activity, ActivityEntry } from '../../types'
import ActivityRow from '../../components/ActivityRow'

type DisciplineSectionProps = {
  discipline: Discipline
  activities: Activity[]
  getEntry: (activityId: string) => ActivityEntry | undefined
  onToggle: (activityId: string) => void
  onIncrement: (activityId: string) => void
  onDecrement: (activityId: string) => void
}

function DisciplineSection({ discipline, activities, getEntry, onToggle, onIncrement, onDecrement }: DisciplineSectionProps) {
  return (
    <section className="mb-6">
      <h2
        className="text-sm font-semibold uppercase tracking-wider mb-2"
        style={{ color: discipline.color }}
      >
        {discipline.name}
      </h2>

      {activities.map(activity => {
        const entry = getEntry(activity.id)
        const checked = !!entry && entry.count > 0

        return (
          <ActivityRow
            key={activity.id}
            name={activity.name}
            points={activity.points}
            checked={checked}
            withCounter={activity.hasCounter}
            count={entry?.count ?? 0}
            onToggle={() => onToggle(activity.id)}
            onIncrement={() => onIncrement(activity.id)}
            onDecrement={() => onDecrement(activity.id)}
          />
        )
      })}
    </section>
  )
}

export default DisciplineSection
