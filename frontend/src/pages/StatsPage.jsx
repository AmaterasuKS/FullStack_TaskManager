import { useOutletContext } from 'react-router-dom'
import StatsChart from '../components/StatsChart'

export default function StatsPage() {
  const { tasks, loading, error } = useOutletContext()

  return (
    <main className="page page--stats">
      {loading ? (
        <p className="page-status">Загрузка…</p>
      ) : null}
      {error ? <p className="page-error">{error}</p> : null}
      <h2 className="page__title">Задачи по статусам</h2>
      <StatsChart tasks={tasks} />
    </main>
  )
}
