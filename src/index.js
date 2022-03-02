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
  console.log(allProjects);
  let currentProject = allProjects.projects[0];
  //createTestTasks();
  updateProjectHeader(currentProject);
  loadTasks(currentProject);

  function createDefaultProject(){
    let newProject = project(1, "My Default Project");
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
    // Note this is now essentially a Save Project button that needs to be renamed
    loadTasks(currentProject);
    storeAllProjects();
    // let currentProj = allProjects.projects;
    // console.log(currentProj);
    // let storedItem = JSON.parse(localStorage.getItem('currentProject'));
    // convertStorageToProject(storedItem);
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
    localStorage.setItem('allProjects', JSON.stringify(allProjectsToStore));

    let storedItem = JSON.parse(localStorage.getItem('allProjects'));

    return;
  }

  function storeAllProjectsv2() {
    let allProjectsToStore = [currentProject];
    let numberOfProjects = allProjectsToStore.length;
    for (let i = 0; i < numberOfProjects; i++ ) {
      let project = allProjectsToStore[i];
      let storedProjectName = `Project ${i}`
      let storedProject = localStorage.setItem(storedProjectName, JSON.stringify(project));
      let openedProject = JSON.parse(localStorage.getItem(storedProjectName));
    }
  }

  function retrieveAllProjects(){
    let storedProjects = JSON.parse(localStorage.getItem('allProjects'));
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
      allTasks.push(newTask)
    }
    return allTasks;
  }

})(); 