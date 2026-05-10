const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function TaskCard({ task, onDelete, onStatusChange }) {
  return (
    <article className="card">
      <div className="card__top">
        <h3 className="card__name">{task.title}</h3>
        <button
          type="button"
          className="btn btn--icon"
          aria-label="Удалить задачу"
          onClick={() => onDelete(task.id)}
        >
          ×
        </button>
      </div>
      <p className="card__date">Создано: {formatDate(task.createdAt)}</p>
      <div className="card__footer">
        <select
          className="card__select"
          aria-label="Статус задачи"
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </article>
  )
}
