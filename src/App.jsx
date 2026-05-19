import { useState } from 'react'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import { useTasks } from './hooks/useTasks'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const { tasks, addTask, removeTask, toggleTask, editTask, reorderTasks } =
    useTasks()

  const filteredTasks = tasks.filter((task) => {
    const matchFilter =
      filter === 'all'
        ? true
        : filter === 'completed'
        ? task.completed
        : filter === 'pending'
        ? !task.completed
        : task.priority === filter

    const matchSearch = task.text.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          taskCount={tasks.length}
          completedCount={tasks.filter((t) => t.completed).length}
        />
        <TaskInput onAdd={addTask} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onRemove={removeTask}
          onEdit={editTask}
          onReorder={reorderTasks}
        />
      </div>
    </div>
  )
}

export default App