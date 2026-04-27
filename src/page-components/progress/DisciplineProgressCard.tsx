import { LineChart, Line, ResponsiveContainer } from 'recharts'
import type { Discipline } from '../../types'

type DisciplineProgressCardProps = {
  discipline: Discipline
  chartData: Record<string, number | string>[]
  total: number
}

function DisciplineProgressCard({ discipline, chartData, total }: DisciplineProgressCardProps) {
  return (
    <div className="mb-4 bg-gray-900 rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-sm" style={{ color: discipline.color }}>
          {discipline.name}
        </span>
        <span className="text-amber-400 text-sm font-bold">+{total} XP</span>
      </div>
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey={discipline.id}
            stroke={discipline.color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DisciplineProgressCard
