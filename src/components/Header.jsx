function Header({ darkMode, setDarkMode, taskCount, completedCount }) {
  return (
    <div className="header">
      <div className="header-top">
        <h1>📝 Task Manager</h1>
        <button
          className="dark-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Dark Mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <div className="stats">
        <span className="stat">Total: <strong>{taskCount}</strong></span>
        <span className="stat">Done: <strong>{completedCount}</strong></span>
        <span className="stat">Pending: <strong>{taskCount - completedCount}</strong></span>
      </div>
    </div>
  )
}

export default Header