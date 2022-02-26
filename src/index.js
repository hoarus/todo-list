import './stylesheets/normalise.css'
import './stylesheets/style.css';
import {  displayTaskForm, hideTaskForm, createTaskFromForm, createTask, completeTask,} from './domManipulation.js';
import { task } from './tasks.js';
import { project } from './projects.js';


(function() {
  // Query Selectors
    // Buttons
  let newTaskButton = document.querySelector(".new-task");
  let closeTaskForm = document.querySelector(".close-task-form");
  let createTaskButton = document.querySelector(".create-task");

  // Temporary Project Creation
  let currentProject = createDefaultProject();

  function createDefaultProject(){
    let newProject = project(1, "My Project");
    return newProject;
  };

  function createTestTasks(){

  }
  

  // Event Listeners
  newTaskButton.addEventListener("click", () => {
    displayTaskForm();
  });

  closeTaskForm.addEventListener("click", () => {
    hideTaskForm();
  });

  createTaskButton.addEventListener("click", () => {
    let newTask = createTaskFromForm();
    currentProject.addNewTask(newTask);
    console.log(currentProject.tasks);
    let toDoContainer = document.querySelector(".to-do-container");
    createTask(toDoContainer, newTask.title, newTask.dueDate, newTask.priority, newTask.description);
    setCheckBoxesToListen();
    hideTaskForm();
  });




  function setCheckBoxesToListen() {
    let checkBoxes = document.getElementsByClassName("check");
    for (const checkBox of checkBoxes) {
      checkBox.addEventListener("click", () => {
        let task = checkBox.parentElement;
        let completedContainer = document.querySelector(".completed-container");
        completeTask(task, completedContainer);
        console.log("Check");
      });
    }
  }


  // Forms



  // Task Object




})();