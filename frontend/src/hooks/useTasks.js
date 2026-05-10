import { useState, useEffect, useCallback } from 'react'
import * as tasksApi from '../api/tasks'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await tasksApi.getTasks()
      setTasks(data)
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        e?.message ||
        'Не удалось загрузить задачи'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
      setTasks([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- начальная загрузка с API
    void load()
  }, [load])

  const addTask = useCallback(async (title) => {
    const trimmed = title.trim()
    if (!trimmed) return
    setError(null)
    try {
      const created = await tasksApi.createTask({
        title: trimmed,
        status: 'todo',
      })
      setTasks((prev) => [...prev, created])
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        e?.message ||
        'Не удалось создать задачу'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
      throw e
    }
  }, [])

  const deleteTask = useCallback(async (id) => {
    setError(null)
    try {
      await tasksApi.deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        e?.message ||
        'Не удалось удалить задачу'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    }
  }, [])

  const updateStatus = useCallback(async (id, status) => {
    setError(null)
    try {
      const updated = await tasksApi.updateTask(id, { status })
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        e?.message ||
        'Не удалось обновить статус'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    }
  }, [])

  return {
    tasks,
    loading,
    error,
    reload: load,
    addTask,
    deleteTask,
    updateStatus,
  }
}
