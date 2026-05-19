let tasks = [];
let filter = "all";
let searchQuery = "";

document.getElementById("addBtn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

document.getElementById("searchInput").addEventListener("input", function (e) {
  searchQuery = e.target.value.toLowerCase();
  renderTasks();
});

function addTask() {
  const input = document.getElementById("taskInput");
  const errorMsg = document.getElementById("errorMsg");
  const text = input.value.trim();

  if (text.length < 3) {
    errorMsg.textContent = "⚠ Task must be at least 3 characters";
    return;
  }

  errorMsg.textContent = "";

  const taskObj = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toLocaleString()
  };

  tasks.push(taskObj);
  saveTasks();
  renderTasks();
  input.value = "";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = stored.map(task => ({
    ...task,
    createdAt: task.createdAt || new Date().toLocaleString()
  }));
  renderTasks();
}

function setFilter(event, type) {
  filter = type;
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const emptyMsg = document.getElementById("emptyMsg");
  const taskCount = document.getElementById("taskCount");

  list.innerHTML = "";

  let filtered = tasks.filter(task => {
    const matchesFilter =
      filter === "completed" ? task.completed :
      filter === "pending" ? !task.completed : true;
    const matchesSearch = task.text.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  taskCount.textContent = `Total Tasks: ${tasks.length}`;

  if (filtered.length === 0) {
    emptyMsg.style.display = "block";
    return;
  } else {
    emptyMsg.style.display = "none";
  }

  filtered.forEach(task => {
    const li = document.createElement("li");

    const taskBox = document.createElement("div");
    taskBox.style.display = "flex";
    taskBox.style.flexDirection = "column";
    taskBox.style.flex = "1";
    taskBox.style.marginLeft = "10px";

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const small = document.createElement("small");
    small.textContent = `Added: ${task.createdAt}`;
    small.style.color = "#777";
    small.style.fontSize = "12px";
    small.style.marginTop = "4px";

    taskBox.appendChild(span);
    taskBox.appendChild(small);

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "✔️";
    completeBtn.onclick = () => {
      tasks = tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t);
      saveTasks();
      renderTasks();
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    };

    span.ondblclick = () => {
      const newText = prompt("Edit task", task.text);
      if (!newText || newText.trim().length < 3) return;
      tasks = tasks.map(t => t.id === task.id ? { ...t, text: newText.trim() } : t);
      saveTasks();
      renderTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(taskBox);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

loadTasks();