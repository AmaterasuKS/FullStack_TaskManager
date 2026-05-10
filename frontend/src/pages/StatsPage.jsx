import StatsChart from '../components/StatsChart'

export default function StatsPage({ tasks }) {
  return (
    <main className="page page--stats">
      <h2 className="page__title">Задачи по статусам</h2>
      <StatsChart tasks={tasks} />
    </main>
  )
}
