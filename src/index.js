import './stylesheets/normalise.css'
import './stylesheets/style.css';
import {  displayTaskForm, hideTaskForm, createTaskFromForm, createTask, completeTask, setTaskListeners, loadTasks} from './domManipulation.js';
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
    let task1 = task(0, "Test 0", "18/02/1994", "High", "Test1");
    let task2 = task(1, "Test 1", "18/02/1994", "High", "Test1");
    let task3 = task(2, "Test 2", "18/02/1994", "High", "Test1");
    let task4 = task(3, "Test 3", "18/02/1994", "High", "Test1");
    task4.setComplete();
    task2.setComplete();
    currentProject.addNewTask(task1);
    currentProject.addNewTask(task2);
    currentProject.addNewTask(task3);
    currentProject.addNewTask(task4);
  }
  

  // Event Listeners
  listProjectTasksButton.addEventListener("click", () => {
    loadTasks(currentProject);
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
    setTaskListeners(currentProject);
    hideTaskForm();
  });


})();