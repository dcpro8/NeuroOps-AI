// taskManager.js

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "tasks.json");

// Read tasks from file
function getTasks() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading tasks:", err);
    return [];
  }
}

// Save tasks to file
function saveTasks(tasks) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error("Error saving tasks:", err);
  }
}

// Add new task
function addTask(title) {
  const tasks = getTasks();

  const newTask = {
    id: Date.now(),
    title,
    completed: false
  };

  tasks.push(newTask);
  saveTasks(tasks);

  console.log("Task added:", newTask);
}

// Mark task complete
function completeTask(id) {
  const tasks = getTasks();

  const task = tasks.find(t => t.id === id);

  if (!task) {
    console.log("Task not found");
    return;
  }

  task.completed = true;
  saveTasks(tasks);

  console.log("Task completed:", task);
}

// Delete task
function deleteTask(id) {
  const tasks = getTasks();

  const updatedTasks = tasks.filter(t => t.id !== id);

  saveTasks(updatedTasks);

  console.log("Task deleted");
}

// List tasks
function listTasks() {
  const tasks = getTasks();

  if (tasks.length === 0) {
    console.log("No tasks available");
    return;
  }

  tasks.forEach(task => {
    console.log(
      `[${task.completed ? "✓" : " "}] ${task.id} - ${task.title}`
    );
  });
}

// Export functions
module.exports = {
  addTask,
  completeTask,
  deleteTask,
  listTasks
};
