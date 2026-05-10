import { BrowserRouter, Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import { useTasks } from './hooks/useTasks'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import BoardPage from './pages/BoardPage'
import StatsPage from './pages/StatsPage'
import LoginPage from './pages/LoginPage'

function AuthShell() {
  const navigate = useNavigate()
  const taskApi = useTasks()
  const username = localStorage.getItem('username') || ''

  function handleLogout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('username')
    navigate('/login', { replace: true })
  }

  return (
    <div className="app">
      <Header
        taskCount={taskApi.tasks.length}
        username={username}
        onLogout={handleLogout}
      />
      <Outlet context={taskApi} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AuthShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<BoardPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
