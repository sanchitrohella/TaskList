const newTask = document.getElementById("task-form");
const filterTask = document.getElementById("task-filter");
const clearTask = document.getElementById("clear-task");
const taskList = document.getElementById("collection");
const taskInput = document.getElementById("task");

// Event Listener for refreshing page

document.addEventListener("DOMContentLoaded", getTasks);

// Getting tasks from local storage

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const list = document.createElement("li");
    list.appendChild(document.createTextNode(task));
    list.className =
      "list-group-item d-flex justify-content-between align-items-center item";
    const span = document.createElement("span");
    span.className = "delete";
    const link = document.createElement("a");
    link.innerHTML = '<i class="fa-solid fa-xmark mark"></i>';
    span.appendChild(link);
    list.appendChild(span);
    taskList.appendChild(list);
  });
}

// Event Listener for adding new task

newTask.addEventListener("submit", addTask);

// Adding New Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add New Task");
  } else {
    const list = document.createElement("li");
    list.appendChild(document.createTextNode(taskInput.value));
    list.className =
      "list-group-item d-flex justify-content-between align-items-center item";
    const span = document.createElement("span");
    span.className = "delete";
    const link = document.createElement("a");
    link.innerHTML = '<i class="fa-solid fa-xmark mark"></i>';
    span.appendChild(link);
    list.appendChild(span);
    taskList.appendChild(list);
    storeToLocalStorage(taskInput.value);
  }
  taskInput.value = "";

  e.preventDefault();
}

// Store to Local Storage
function storeToLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event Listener for deleting task

taskList.addEventListener("click", deleteTask);

// Deleting single task
function deleteTask(e) {
  if (e.target.parentElement.parentElement.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
  }

  removeTaskFromLocalStorage(
    e.target.parentElement.parentElement.parentElement
  );
  e.preventDefault();
}

// Removing single task from Local Storage

function removeTaskFromLocalStorage(taskToRemove) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskToRemove.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event Listener for filter

filterTask.addEventListener("keyup", searchTask);

// Filtering specific tasks

function searchTask(e) {
  const filterText = e.target.value.toLowerCase();

  document.querySelectorAll(".item").forEach(function (task) {
    const item = task.textContent;
    if (item.toLowerCase().indexOf(filterText) != -1) {
      task.setAttribute("style", "display:flex !important");
    } else {
      task.setAttribute("style", "display:none !important");
    }
  });
}

// Event Listener for clearing tasks

clearTask.addEventListener("click", removeTask);
// Clearing Tasks List
function removeTask(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTaskFromLocalStorage();

  e.preventDefault();
}

// Clearing tasks from Local Storage

function clearTaskFromLocalStorage() {
  localStorage.clear();
}
