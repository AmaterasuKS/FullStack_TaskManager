import { api } from './client'

export function mapTask(t) {
  return {
    id: t.id,
    title: t.title,
    status: t.status,
    createdAt: t.created_at,
    ownerUsername: t.owner_username,
  }
}

export async function getTasks() {
  const { data } = await api.get('/api/tasks')
  return data.map(mapTask)
}

export async function createTask(body) {
  const { data } = await api.post('/api/tasks', {
    title: body.title,
    status: body.status ?? 'todo',
  })
  return mapTask(data)
}

export async function updateTask(id, body) {
  const { data } = await api.put(`/api/tasks/${id}`, body)
  return mapTask(data)
}

export async function deleteTask(id) {
  await api.delete(`/api/tasks/${id}`)
}
