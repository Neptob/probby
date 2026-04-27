import type { Discipline } from '../../types'
import DisciplineProgressCard from './DisciplineProgressCard'

type DisciplineChartsProps = {
  chartData: Record<string, number | string>[]
  disciplines: Discipline[]
}

function DisciplineCharts({ chartData, disciplines }: DisciplineChartsProps) {
  return (
    <section>
      <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-3">Per disciplina</h2>
      {disciplines.map(discipline => {
        const total = chartData.length > 0
          ? (chartData[chartData.length - 1][discipline.id] as number)
          : 0

        return (
          <DisciplineProgressCard
            key={discipline.id}
            discipline={discipline}
            chartData={chartData}
            total={total}
          />
        )
      })}
    </section>
  )
}

export default DisciplineCharts
