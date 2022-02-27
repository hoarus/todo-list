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
  let listProjectTasksButton = document.querySelector(".list-project-tasks");

  // Temporary Project Creation
  let currentProject = createDefaultProject();
  createTestTasks();

  function createDefaultProject(){
    let newProject = project(1, "My Project");
    return newProject;
    
  };

  function createTestTasks(){
    let task1 = task(1, "Test", "18/02/1994", "High", "Test1");
    let task2 = task(2, "Test 2", "18/02/1994", "High", "Test1");
    let task3 = task(3, "Test 3", "18/02/1994", "High", "Test1");
    let task4 = task(4, "Test 4", "18/02/1994", "High", "Test1");
    task4.setComplete();
    task2.setComplete();
    currentProject.addNewTask(task1);
    currentProject.addNewTask(task2);
    currentProject.addNewTask(task3);
    currentProject.addNewTask(task4);
    console.log(currentProject.tasks);
  }
  

  // Event Listeners
  listProjectTasksButton.addEventListener("click", () => {
    console.log(currentProject.tasks);
    for (const task of currentProject.tasks) {
      createTask(task);
    }
    setCheckBoxesToListen();
  });

  newTaskButton.addEventListener("click", () => {
    displayTaskForm();
  });

  closeTaskForm.addEventListener("click", () => {
    hideTaskForm();
  });

  createTaskButton.addEventListener("click", () => {
    let newTask = createTaskFromForm(currentProject);
    currentProject.addNewTask(newTask);
    createTask(newTask);
    setCheckBoxesToListen();
    hideTaskForm();
  });





  function setCheckBoxesToListen() {
    let checkBoxes = document.getElementsByClassName("check");
    for (const checkBox of checkBoxes) {
      checkBox.addEventListener("click", () => {
        let task = checkBox.parentElement;
        let completedContainer = document.querySelector(".completed-container");
        completeTask(task, completedContainer, currentProject);
      });
    }
    let minimiseBoxes = document.getElementsByClassName("minimise");
    for (const minimiser of minimiseBoxes) {
      minimiser.addEventListener("click", () => {
        let task = minimiser.parentElement;
        hideDetailedElements(task);
      });
    }

  };

  function hideDetailedElements(task){
    let priority = task.querySelector(".task-priority");
    let description = task.querySelector(".task-description");
    let dueDate = task.querySelector(".task-date");
    let minimise = task.querySelector(".minimise")
    priority.classList.toggle("hidden");
    description.classList.toggle("hidden");
    dueDate.classList.toggle("hidden");
    minimise.classList.toggle("maximise")
    
  }


  // Forms



  // Task Object




})();