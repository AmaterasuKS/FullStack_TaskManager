import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTasks } from './hooks/useTasks'
import Header from './components/Header'
import BoardPage from './pages/BoardPage'
import StatsPage from './pages/StatsPage'

export default function App() {
  const { tasks, addTask, deleteTask, updateStatus } = useTasks()

  return (
    <BrowserRouter>
      <div className="app">
        <Header taskCount={tasks.length} />
        <Routes>
          <Route
            path="/"
            element={
              <BoardPage
                tasks={tasks}
                addTask={addTask}
                deleteTask={deleteTask}
                updateStatus={updateStatus}
              />
            }
          />
          <Route path="/stats" element={<StatsPage tasks={tasks} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
