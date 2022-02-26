import './stylesheets/normalise.css'
import './stylesheets/style.css';
import {  displayItem, hideItem, createTask, completeTask,} from './domManipulation.js';

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
  createTask(toDoContainer);
});

for (const checkBox of checkBoxes) {
  checkBox.addEventListener("click", () => {
    let task = checkBox.parentElement;
    completeTask(task, completedContainer);
  });
}
