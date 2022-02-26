//Functions

function displayItem(item) {
  item.classList.remove("hidden");
}

function hideItem(item) {
  item.classList.add("hidden");
}

function createTask(destination){
  let newTask = generateTask();
  destination.appendChild(newTask);
}

function generateTask(){
  const newTask = document.createElement("div");
  newTask.setAttribute("class", "task");
  newTask.textContent = "Test";
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