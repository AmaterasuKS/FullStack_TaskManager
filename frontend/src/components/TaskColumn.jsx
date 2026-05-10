import TaskCard from './TaskCard'

export default function TaskColumn({
  variant,
  title,
  id,
  tasks,
  onDelete,
  onStatusChange,
}) {
  return (
    <section
      className={`column column--${variant}`}
      aria-labelledby={id}
    >
      <h2 className="column__title" id={id}>
        {title}
      </h2>
      <div className="column__list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </section>
  )
}
