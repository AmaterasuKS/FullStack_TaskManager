import TaskColumn from '../components/TaskColumn'
import TaskForm from '../components/TaskForm'

export default function BoardPage({
  tasks,
  addTask,
  deleteTask,
  updateStatus,
}) {
  return (
    <main>
      <TaskForm onAdd={addTask} />
      <div className="board">
        <TaskColumn
          variant="todo"
          title="To Do"
          id="col-todo"
          tasks={tasks.filter((t) => t.status === 'todo')}
          onDelete={deleteTask}
          onStatusChange={updateStatus}
        />
        <TaskColumn
          variant="progress"
          title="In Progress"
          id="col-progress"
          tasks={tasks.filter((t) => t.status === 'inprogress')}
          onDelete={deleteTask}
          onStatusChange={updateStatus}
        />
        <TaskColumn
          variant="done"
          title="Done"
          id="col-done"
          tasks={tasks.filter((t) => t.status === 'done')}
          onDelete={deleteTask}
          onStatusChange={updateStatus}
        />
      </div>
    </main>
  )
}
