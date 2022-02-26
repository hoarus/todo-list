//Functions

import { task } from './tasks.js';

// Private

function displayItem(item) {
  item.classList.remove("hidden");
}

function hideItem(item) {
  item.classList.add("hidden");
}

function generateTask(title, dueDate, priority, description){
  const newTask = createElement("div", "task");
  const taskID = createElement("div", "id", "3");
  taskID.classList.add("hidden");
  const taskCheck = createElement("div", "check");
  const taskTitle = createElement("h3", "task-title", title);
  const taskDate = createElement("p", "task-date", dueDate);
  const taskPriority = createElement("p", "task-priority", priority);
  const taskDescription = createElement("p", "task-description", description);

  newTask.appendChild(taskID);
  newTask.appendChild(taskCheck);
  newTask.appendChild(taskTitle);
  newTask.appendChild(taskPriority);
  newTask.appendChild(taskDate);
  newTask.appendChild(taskDescription);

  return newTask;
}

function createElement(type, classname, content, id) {
  const newElement = document.createElement(type);
  newElement.setAttribute('class',classname);
  if (typeof id !="undefined" ) {
    newElement.setAttribute('id', id);
  }
  newElement.textContent = content;
  return newElement;
}

// Public 
function displayTaskForm() {
  let pageWrapper = document.querySelector(".page-wrapper");
  let taskForm = document.querySelector(".task-form-container");
  displayItem(taskForm);
  pageWrapper.classList.add("dimmed");
}

function hideTaskForm() {
  let taskForm = document.querySelector(".task-form-container");
  let pageWrapper = document.querySelector(".page-wrapper");
  let form = document.querySelector(".task-form");
  form.reset();
  hideItem(taskForm);
  pageWrapper.classList.remove("dimmed");
}

function createTaskFromForm (project) {
  let title = document.querySelector("#title").value;
  let dueDate = document.querySelector("#due-date").value;
  let priority = document.querySelector("#priority").value;
  let description = document.querySelector("#description").value;
  console.log(title, dueDate, priority, description);
  let newTask = task(title, dueDate, priority, description);
  return newTask;
}

function createTask(parent, title, dueDate, priority, description){
  let newTask = generateTask(title, dueDate, priority, description);
  parent.appendChild(newTask);
}

function completeTask(task, destination) {
  destination.appendChild(task);
}




export {
  displayTaskForm,
  hideTaskForm,
  createTask,
  completeTask,
  createTaskFromForm,
};