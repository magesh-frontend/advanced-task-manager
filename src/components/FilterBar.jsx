const filters = [
  { label: 'All', value: 'all' },
  { label: '✅ Done', value: 'completed' },
  { label: '⏳ Pending', value: 'pending' },
  { label: '🔴 High', value: 'high' },
  { label: '🟡 Medium', value: 'medium' },
  { label: '🟢 Low', value: 'low' },
]

function FilterBar({ filter, setFilter, search, setSearch }) {
  return (
    <div className="filter-section">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`filter-btn ${filter === f.value ? 'active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar