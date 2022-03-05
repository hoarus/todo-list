import './stylesheets/normalise.css'
import './stylesheets/style.css';
import {  displayTaskForm, hideTaskForm, createTaskFromForm, createTask, completeTask, setTaskListeners, loadTasks, updateProjectHeader, displayProjectNameForm, hideProjectNameForm} from './domManipulation.js';
import { task } from './tasks.js';
import { project } from './projects.js';
import { AllProjects } from './allProjects.js';


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
  let allProjects = retrieveAllProjects();
  let currentProject = allProjects.projects[0];
  //createTestTasks();
  updateProjectHeader(currentProject);
  loadTasks(currentProject);

  // Event Listeners
  listProjectTasksButton.addEventListener("click", () => {
    // Note this is now essentially a Save Project button that needs to be renamed
    loadTasks(currentProject);
    storeAllProjects();
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

  function convertStorageToProject(storedProject) {
    let newProject = project(storedProject.id,  storedProject.name);
    for (let key in storedProject.tasks) {
      let storedTask = storedProject.tasks[key];  
      let newTask = task(storedTask.id, storedTask.title, storedTask.dueDate, storedTask.priority, storedTask.description);    
      newProject.addNewTask(newTask);
    };
    return storedProject;
  }



  function checkForLocalStorage() {
    if(!localStorage.getItem('allProjects')) {
      let defaultProject = JSON.parse(localStorage.getItem('currentProject'));
      convertStorageToProject(storedItem);
      return 
    } else {
      setStyles();
    }    
  }

  function storeAllProjects(){
    let allProjectsToStore = AllProjects([ currentProject] );
    localStorage.setItem('allProjects', JSON.stringify(allProjectsToStore));s
    return;
  }


  function retrieveAllProjects(){
    let storedProjects = JSON.parse(localStorage.getItem('allProjects'));
    console.log(storedProjects);
    let allProjects = createAllProjects(storedProjects);
    return allProjects;
  }


  function createAllProjects(storedProjects) {
    let allProjectsArray = []
    for (const key in storedProjects.projects) {
      let storedProject = storedProjects.projects[key];
      let newProject = createProject(storedProject);
      allProjectsArray.push(newProject);
    }
    let allProjects = AllProjects(allProjectsArray);
    return allProjects;
  }


  function createProject(storedProject){
    let id = storedProject.id;
    let name = storedProject.name;
    let newProject = project(id, name);
    let storedTasks = createAllTasks(storedProject);
    for (const task of storedTasks) {
      newProject.addNewTask(task);
    }
    return newProject;
  }

  function createAllTasks(storedProject){
    let allTasks = []
    for (const key in storedProject.tasks) {
      let storedTask = storedProject.tasks[key];
      let id = storedTask.id;
      let title = storedTask.title;
      let dueDate = storedTask.dueDate;
      let priority = storedTask.priority;
      let description = storedTask.description;
      let newTask = task(id, title, dueDate, priority, description)
      if (storedTask.status == "Complete") {
        newTask.toggleStatus();
      }
      console.log(newTask);
      allTasks.push(newTask)
    }
    return allTasks;
  }

})(); 