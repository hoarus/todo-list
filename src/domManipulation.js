//Functions

function displayItem(item) {
  item.classList.remove("hidden");
}

function hideItem(item) {
  item.classList.add("hidden");
}

function createTask(destination, title, dueDate, priority, description){
  let newTask = generateTask(title, dueDate, priority, description);
  destination.appendChild(newTask);
}

function generateTask(title, dueDate, priority, description){
  const newTask = document.createElement("div");
  newTask.setAttribute("class", "task");
  const taskTitle = document.createElement("h3");
  taskTitle.setAttribute("class", "task-title");
  taskTitle.textContent = title;
  const taskCheck = document.createElement("div");
  taskCheck.setAttribute("class", "check");
  const taskDate = document.createElement("p");
  taskDate.setAttribute("class", "task-date");
  taskDate.textContent = dueDate;
  const taskPriority = document.createElement("p");
  taskPriority.setAttribute("class", "task-priority");
  taskPriority.textContent = priority;
  const taskDescription = document.createElement("p");
  taskDescription.setAttribute("class", "task-description");
  taskDescription.textContent = description;

  newTask.appendChild(taskCheck);
  newTask.appendChild(taskTitle);
  newTask.appendChild(taskPriority);
  newTask.appendChild(taskDate);
  newTask.appendChild(taskDescription);

  return newTask;
}

function completeTask(task, destination) {
  destination.appendChild(task);
}

export {
  displayItem,
  hideItem,
  createTask,
  completeTask,
};