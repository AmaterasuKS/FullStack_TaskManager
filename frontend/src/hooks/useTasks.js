import { useState, useCallback } from 'react'

function buildInitialTasks() {
  const now = Date.now()
  return [
    {
      id: 1,
      title: 'Спроектировать API задач',
      status: 'todo',
      createdAt: new Date(now - 86400000 * 2).toISOString(),
    },
    {
      id: 2,
      title: 'Сверстать прототип досок',
      status: 'inprogress',
      createdAt: new Date(now - 86400000).toISOString(),
    },
    {
      id: 3,
      title: 'Подключить FastAPI к фронту',
      status: 'done',
      createdAt: new Date(now - 3600000).toISOString(),
    },
  ]
}

export function useTasks() {
  const [tasks, setTasks] = useState(buildInitialTasks)

  const addTask = useCallback((title) => {
    const trimmed = title.trim()
    if (!trimmed) return
    setTasks((prev) => {
      const nextId = prev.reduce((m, t) => Math.max(m, t.id), 0) + 1
      return [
        ...prev,
        {
          id: nextId,
          title: trimmed,
          status: 'todo',
          createdAt: new Date().toISOString(),
        },
      ]
    })
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const updateStatus = useCallback((id, status) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t)),
    )
  }, [])

  return { tasks, addTask, deleteTask, updateStatus }
}
