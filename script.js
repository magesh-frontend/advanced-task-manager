let tasks = [];
let filter = "all";

// Event Listeners
document.getElementById("addBtn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

// Add Task
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text.length < 3) {
        alert("⚠ Task must be at least 3 characters");
        return;
    }

    const taskObj = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(taskObj);
    saveTasks();
    renderTasks();

    input.value = "";
}

// Save to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks
function loadTasks() {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = stored;
    renderTasks();
}

// Set Filter
function setFilter(event, type) {
    filter = type;

    document.querySelectorAll(".filters button").forEach(btn => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");

    renderTasks();
}

// Render Tasks
function renderTasks() {
    const list = document.getElementById("taskList");
    const emptyMsg = document.getElementById("emptyMsg");
    const taskCount = document.getElementById("taskCount");

    list.innerHTML = "";

    let filtered = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    taskCount.textContent = `Total Tasks: ${tasks.length}`;

    if (filtered.length === 0) {
        emptyMsg.style.display = "block";
        return;
    } else {
        emptyMsg.style.display = "none";
    }

    filtered.forEach((task) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        // ✅ Toggle Complete
        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "✔️";
        completeBtn.onclick = () => {
            tasks = tasks.map(t =>
                t.id === task.id ? { ...t, completed: !t.completed } : t
            );
            saveTasks();
            renderTasks();
        };

        // ✅ Delete Task
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        };

        // ✅ Edit Task (double click)
        span.ondblclick = () => {
            const newText = prompt("Edit task", task.text);
            if (!newText) return;

            tasks = tasks.map(t =>
                t.id === task.id ? { ...t, text: newText } : t
            );

            saveTasks();
            renderTasks();
        };

        li.appendChild(completeBtn);
        li.appendChild(span);
        li.appendChild(removeBtn);

        list.appendChild(li);
    });
}

// Initial Load
loadTasks();
