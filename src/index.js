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
let checkBoxes = document.getElementsByClassName("check");

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
  let newTask = createTaskFromForm();
  console.log(newTask);
  createTask(toDoContainer, newTask.title, newTask.dueDate, newTask.priority, newTask.description);
  console.log(checkBoxes);
  setCheckBoxesToListen();
  let form = document.querySelector(".task-form");
  form.reset();
  hideItem(taskForm);
  pageWrapper.classList.remove("dimmed");
});




function setCheckBoxesToListen() {
  for (const checkBox of checkBoxes) {
    checkBox.addEventListener("click", () => {
      let task = checkBox.parentElement;
      completeTask(task, completedContainer);
      console.log("Check");
    });
  }
}

// Task Object

function createTaskFromForm () {
  let title = document.querySelector("#title").value;
  let dueDate = document.querySelector("#due-date").value;
  let priority = document.querySelector("#priority").value;
  let description = document.querySelector("#description").value;
  console.log(title, dueDate, priority, description);
  let newTask = task(title, dueDate, priority, description);
  return newTask;
}

const task = (title, dueDate, priority, description) => {
  let status = "To Do";

  let setComplete = () => {
    status = "Complete";
  }

  let setToDo = () => {
    status = "To Do"
  }
  return { title, dueDate, priority, description, status, setComplete, setToDo };
};
