import TaskItem from './TaskItem'

function TaskList({ tasks, onToggle, onRemove, onEdit, onReorder }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>🚀 No tasks here. Add one above!</p>
      </div>
    )
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('dragIndex', index)
  }

  const handleDrop = (e, dropIndex) => {
    const dragIndex = Number(e.dataTransfer.getData('dragIndex'))
    if (dragIndex !== dropIndex) onReorder(dragIndex, dropIndex)
  }

  const handleDragOver = (e) => e.preventDefault()

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      ))}
    </ul>
  )
}

export default TaskList