//Functions

import { task } from './tasks.js';

// Private

function displayItem(item) {
  item.classList.remove("hidden");
}

function hideItem(item) {
  item.classList.add("hidden");
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
  let id = project.maxID + 1;
  let title = document.querySelector("#title").value;
  let dueDate = document.querySelector("#due-date").value;
  let priority = document.querySelector("#priority").value;
  let description = document.querySelector("#description").value;
  let newTask = task(id, title, dueDate, priority, description);
  return newTask;
}

function createTask(parent, task){
  const newTask = createElement("div", "task","", task.id);
  const taskCheck = createElement("div", "check");
  const taskTitle = createElement("h3", "task-title", task.title);
  const taskDate = createElement("p", "task-date", task.dueDate);
  const taskPriority = createElement("p", "task-priority", task.priority);
  const taskDescription = createElement("p", "task-description", task.description);

  newTask.appendChild(taskCheck);
  newTask.appendChild(taskTitle);
  newTask.appendChild(taskPriority);
  newTask.appendChild(taskDate);
  newTask.appendChild(taskDescription);

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