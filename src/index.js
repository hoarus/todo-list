import './stylesheets/normalise.css'
import './stylesheets/style.css';


let newTaskButton = document.querySelector(".new-task");
let taskForm = document.querySelector(".task-form-container");
let closeTaskForm = document.querySelector(".close-task-form");
let toDoContainer = document.querySelector(".to-do-container");
let createTaskButton = document.querySelector(".create-task");
let pageWrapper = document.querySelector(".page-wrapper");
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