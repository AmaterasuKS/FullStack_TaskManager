import { api } from './client'

export async function login(username, password) {
  const { data } = await api.post('/api/auth/login', { username, password })
  return data
}

export async function register(username, password) {
  const { data } = await api.post('/api/auth/register', {
    username,
    password,
  })
  return data
}
