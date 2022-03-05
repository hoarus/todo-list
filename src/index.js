import './stylesheets/normalise.css'
import './stylesheets/style.css';
import {  displayTaskForm, hideTaskForm, createTaskFromForm, createTask, completeTask, setTaskListeners, loadTasks, updateProjectHeader, displayProjectNameForm, hideProjectNameForm} from './domManipulation.js';
import { task } from './tasks.js';
import { project } from './projects.js';
import { AllProjects } from './allProjects.js';
import { checkForLocalStorage, saveAllProjects, loadAllProjects } from './saveAndLoad.js';


(function() {
  // Query Selectors
    // Buttons
  let newTaskButton = document.querySelector(".new-task");
  let closeTaskForm = document.querySelector(".close-task-form");
  let createTaskButton = document.querySelector(".create-task");
  let listProjectTasksButton = document.querySelector(".list-project-tasks");
  let editProjectNameButton = document.querySelector(".edit-project-name");
  let closeProjectNameFormButton = document.querySelector(".close-edit-project-name-form");
  let submitProjectNameButton = document.querySelector(".submit-project-name");

  // Temporary Project Creation
  let allProjects = loadAllProjects();
  let currentProject = allProjects.projects[0];
  //createTestTasks();
  updateProjectHeader(currentProject);
  loadTasks(currentProject);

  // Event Listeners
  listProjectTasksButton.addEventListener("click", () => {
    // Note this is now essentially a Save Project button that needs to be renamed
    loadTasks(currentProject);
    saveAllProjects(currentProject);
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

  editProjectNameButton.addEventListener("click", () => {
    displayProjectNameForm(currentProject);
  });

  closeProjectNameFormButton.addEventListener("click", () => {
    hideProjectNameForm();
  });

  submitProjectNameButton.addEventListener("click", () => {
    hideProjectNameForm();
    let updatedProjectName = document.querySelector(".edit-project-name-input").value;
    currentProject.name = updatedProjectName;
    updateProjectHeader(currentProject);
  });


  // ALL IN PROGRESS (ENACTED BY LIST ALl TASKS BUTTON)

  

})(); 