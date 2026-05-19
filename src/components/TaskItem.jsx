import { useState } from 'react'

const priorityColors = {
  high: '#ff4d4d',
  medium: '#f5a623',
  low: '#52c41a',
}

function TaskItem({ task, index, onToggle, onRemove, onEdit, onDragStart, onDrop, onDragOver }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const handleEditSave = () => {
    if (editText.trim().length >= 3) {
      onEdit(task.id, editText.trim())
    }
    setIsEditing(false)
  }

  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date()

  return (
    <li
      className={`task-item ${task.completed ? 'task-done' : ''} ${isOverdue ? 'task-overdue' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onDragOver={onDragOver}
    >
      <span
        className="priority-dot"
        style={{ background: priorityColors[task.priority] }}
      />
      <button className="toggle-btn" onClick={() => onToggle(task.id)}>
        {task.completed ? '✅' : '⬜'}
      </button>
      <div className="task-body">
        {isEditing ? (
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditSave()
              if (e.key === 'Escape') setIsEditing(false)
            }}
            autoFocus
          />
        ) : (
          <span
            className={`task-text ${task.completed ? 'completed' : ''}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}
        <div className="task-meta">
          <small>{task.createdAt}</small>
          {task.dueDate && (
            <small className={isOverdue ? 'overdue-text' : ''}>
              {isOverdue ? '⚠️' : '📅'} Due: {task.dueDate}
            </small>
          )}
        </div>
      </div>
      <div className="task-actions">
        {isEditing ? (
          <button className="save-btn" onClick={handleEditSave}>💾</button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️</button>
        )}
        <button className="remove-btn" onClick={() => onRemove(task.id)}>🗑️</button>
      </div>
    </li>
  )
}

export default TaskItem