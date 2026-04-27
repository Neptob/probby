import { useMemo } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import type { Discipline } from '../../types'

type StatRadarProps = {
  chartData: Record<string, number | string>[]
  disciplines: Discipline[]
}

function StatRadar({ chartData, disciplines }: StatRadarProps) {
  const radarData = useMemo(() => {
    const last = chartData[chartData.length - 1]
    return disciplines.map(d => ({
      discipline: d.name,
      xp: last ? (last[d.id] as number) : 0,
    }))
  }, [chartData, disciplines])

  return (
    <section className="mb-8">
      <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-3">Stat</h2>
      <div className="bg-gray-900 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="discipline" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Radar dataKey="xp" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default StatRadar
