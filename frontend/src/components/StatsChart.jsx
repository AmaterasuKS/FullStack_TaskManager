import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const ROWS = [
  { status: 'todo', name: 'To Do' },
  { status: 'inprogress', name: 'In Progress' },
  { status: 'done', name: 'Done' },
]

export default function StatsChart({ tasks }) {
  const data = ROWS.map(({ status, name }) => ({
    name,
    count: tasks.filter((t) => t.status === status).length,
  }))

  return (
    <div className="stats-chart-wrap">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 16, right: 16, left: 8, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            axisLine={{ stroke: '#27272a' }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            axisLine={{ stroke: '#27272a' }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }}
            contentStyle={{
              background: '#1a1a1a',
              border: '1px solid #27272a',
              borderRadius: 8,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#6366f1' }}
          />
          <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
