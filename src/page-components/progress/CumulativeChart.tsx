import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { Discipline } from '../../types'

type CumulativeChartProps = {
  chartData: Record<string, number | string>[]
  disciplines: Discipline[]
}

function CumulativeChart({ chartData, disciplines }: CumulativeChartProps) {
  const xTicks = useMemo(() => {
    if (chartData.length <= 5) return chartData.map(d => d.date as string)
    const step = (chartData.length - 1) / 4
    return [0, 1, 2, 3, 4].map(i => chartData[Math.round(i * step)].date as string)
  }, [chartData])

  return (
    <section className="mb-8">
      <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-3">XP cumulativo</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" ticks={xTicks} tick={{ fill: '#6b7280', fontSize: 10 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} width={30} />
          <Tooltip
            contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 8 }}
            labelStyle={{ color: '#f9fafb' }}
            itemStyle={{ fontSize: 12 }}
          />
          {disciplines.map(discipline => (
            <Line
              key={discipline.id}
              type="monotone"
              dataKey={discipline.id}
              name={discipline.name}
              stroke={discipline.color}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}

export default CumulativeChart
