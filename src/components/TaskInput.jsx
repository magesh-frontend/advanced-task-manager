import { useState } from 'react'

function TaskInput({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  const handleAdd = () => {
    if (text.trim().length < 3) {
      setError('⚠ Task must be at least 3 characters')
      return
    }
    setError('')
    onAdd({ text: text.trim(), priority, dueDate })
    setText('')
    setDueDate('')
    setPriority('medium')
  }

  return (
    <div className="task-input-card">
      <div className="input-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="main-input"
        />
      </div>
      <div className="input-row options-row">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
        <button onClick={handleAdd} className="add-btn">
          + Add Task
        </button>
      </div>
      {error && <p className="error-msg">{error}</p>}
    </div>
  )
}

export default TaskInput