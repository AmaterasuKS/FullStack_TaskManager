import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authApi from '../api/auth'

function formatError(err) {
  const d = err?.response?.data?.detail
  if (typeof d === 'string') return d
  if (Array.isArray(d)) return d.map((x) => x.msg || x).join(', ')
  return err?.message || 'Произошла ошибка'
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setPending(true)
    try {
      const data = await authApi.login(username, password)
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('username', username)
      navigate('/', { replace: true })
    } catch (err) {
      setError(formatError(err))
    } finally {
      setPending(false)
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    setPending(true)
    try {
      await authApi.register(username, password)
      const data = await authApi.login(username, password)
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('username', username)
      navigate('/', { replace: true })
    } catch (err) {
      setError(formatError(err))
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">
          <span>Task</span> Manager
        </h1>
        <p className="login-subtitle">Войдите или создайте аккаунт</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="login-label" htmlFor="login-username">
            Имя пользователя
          </label>
          <input
            id="login-username"
            className="login-input"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="login-label" htmlFor="login-password">
            Пароль
          </label>
          <input
            id="login-password"
            type="password"
            className="login-input"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error ? <p className="login-error">{error}</p> : null}

          <div className="login-actions">
            <button
              type="submit"
              className="btn btn--primary login-btn"
              disabled={pending}
            >
              Войти
            </button>
            <button
              type="button"
              className="btn btn--secondary login-btn"
              disabled={pending}
              onClick={handleRegister}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>

        <p className="login-hint">
          Нет аккаунта? Нажмите «Зарегистрироваться» с теми же полями.
        </p>
      </div>
    </div>
  )
}
