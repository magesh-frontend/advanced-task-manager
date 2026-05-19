import { useState, useEffect } from 'react'

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks-react')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks-react', JSON.stringify(tasks))
  }, [tasks])

  const addTask = ({ text, priority, dueDate }) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority: priority || 'medium',
      dueDate: dueDate || '',
      createdAt: new Date().toLocaleString(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    )
  }

  const reorderTasks = (fromIndex, toIndex) => {
    setTasks((prev) => {
      const updated = [...prev]
      const [moved] = updated.splice(fromIndex, 1)
      updated.splice(toIndex, 0, moved)
      return updated
    })
  }

  return { tasks, addTask, removeTask, toggleTask, editTask, reorderTasks }
}