import './stylesheets/normalise.css'
import './stylesheets/style.css';

// Query Selectors
  //Containers
let pageWrapper = document.querySelector(".page-wrapper");
let toDoContainer = document.querySelector(".to-do-container");
let completedContainer = document.querySelector(".completed-container");
let taskForm = document.querySelector(".task-form-container");
  // Buttons
let newTaskButton = document.querySelector(".new-task");
let closeTaskForm = document.querySelector(".close-task-form");
let createTaskButton = document.querySelector(".create-task");
let checkBoxes = document.querySelectorAll(".check");

//Write code to make add new task

// Event Listeners
newTaskButton.addEventListener("click", () => {
  displayItem(taskForm);
  pageWrapper.classList.add("dimmed");
});

closeTaskForm.addEventListener("click", () => {
  hideItem(taskForm);
  pageWrapper.classList.remove("dimmed");
});

createTaskButton.addEventListener("click", () => {
  createTask();
});

for (const checkBox of checkBoxes) {
  checkBox.addEventListener("click", () => {
    let task = checkBox.parentElement;
    completeTask(task);
  });
}

//Functions

function displayItem(item) {
  item.classList.remove("hidden");
}

function hideItem(item) {
  item.classList.add("hidden");
}

function createTask(){
  let newTask = generateTask();
  toDoContainer.appendChild(newTask);
}

function generateTask(){
  const newTask = document.createElement("div");
  newTask.setAttribute("class", "task");
  newTask.textContent = "Test";
  return newTask;
}

function completeTask(task) {
  completedContainer.appendChild(task);
}