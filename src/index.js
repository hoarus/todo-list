import './stylesheets/normalise.css'
import './stylesheets/style.css';
import {  displayTaskForm, hideTaskForm, createTaskFromForm, createTask, completeTask, 
  setTaskListeners, renderTasks, updateProjectHeader, displayProjectNameForm, hideProjectNameForm, 
  displaySelectProjectForm, hideSelectProjectForm, displayNewProjectForm, hideNewProjectForm,
  createProjectFromForm, } from './domManipulation.js';
import { task } from './tasks.js';
import { project } from './projects.js';
import { AllProjects } from './allProjects.js';
import { checkForLocalStorage, saveAllProjects, loadAllProjects } from './saveAndLoad.js';


(function() {
  // Query Selectors
    // Buttons
  // New Task
  let newTaskButton = document.querySelector(".new-task");
  let closeTaskForm = document.querySelector(".close-task-form");
  let createTaskButton = document.querySelector(".create-task");
  
  // Project Name
  let editProjectNameButton = document.querySelector(".edit-project-name");
  let closeProjectNameFormButton = document.querySelector(".close-edit-project-name-form");
  let submitProjectNameButton = document.querySelector(".submit-project-name");

  //Select Project
  let selectProjectButton = document.querySelector(".select-project");
  let closeSelectProjectFormButton = document.querySelector(".close-select-project-form");

  // New Project
  let newProjectButton = document.querySelector(".new-project");
  let closeNewProjectFormButton = document.querySelector(".close-new-project-form");
  let createNewProjectButton = document.querySelector(".create-project");

  // General
  let listProjectTasksButton = document.querySelector(".list-project-tasks");


  // Temporary Project Creation
  let allProjects = loadAllProjects();
  let currentProject = allProjects.projects[0];
  renderProject();
  //createTestTasks();


  // Event Listeners
  listProjectTasksButton.addEventListener("click", () => {
    // Note this is now essentially a Save Project button that needs to be renamed
    renderTasks(currentProject);
    saveAllProjects(allProjects);
  });

  // New Task
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

  // Edit Project Name
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


  // Select Project
  selectProjectButton.addEventListener("click", () => {
    displaySelectProjectForm(allProjects);
  });

  closeSelectProjectFormButton.addEventListener("click", () => {
    hideSelectProjectForm();
  })

  // New Project
  newProjectButton.addEventListener("click", () => {
    displayNewProjectForm();
  });

  closeNewProjectFormButton.addEventListener("click", () => {
    hideNewProjectForm();
  })

  createNewProjectButton.addEventListener("click", () => {
    let newProject = createProjectFromForm();
    allProjects.addNewProject(newProject);
    console.log(newProject);
    let newProjectPosition = (allProjects.projects.length) - 1;
    currentProject = allProjects.projects[newProjectPosition];
    renderProject();
  })

function renderProject() {
  updateProjectHeader(currentProject);
  renderTasks(currentProject);
}
})(); 