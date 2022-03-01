import './stylesheets/normalise.css'
import './stylesheets/style.css';
import {  displayTaskForm, hideTaskForm, createTaskFromForm, createTask, completeTask, setTaskListeners, loadTasks, updateProjectHeader, displayProjectNameForm, hideProjectNameForm} from './domManipulation.js';
import { task } from './tasks.js';
import { project } from './projects.js';
import { allProjects } from './allProjects.js';


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
  let currentProject = createDefaultProject();
  createTestTasks();
  updateProjectHeader(currentProject);

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
    loadTasks(currentProject);
    storeAllProjects();
    // let allProjects = retrieveAllProjects;
    // console.log(allProjects);
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
    console.log(storedProject.tasks);
    for (let key in storedProject.tasks) {
      let storedTask = storedProject.tasks[key];  
      let newTask = task(storedTask.id, storedTask.title, storedTask.dueDate, storedTask.priority, storedTask.description);    
      console.log(newTask);
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
    let allProjectsToStore = allProjects({ 0: currentProject} );
    console.log(allProjectsToStore);
    // let storedItem = localStorage.setItem('allProjects', JSON.stringify(allProjects));
    // console.log(storedItem);
    return;
  }

  function retrieveAllProjects(){
    let allProjects = localStorage.getItem('allProjects');
    return allProjects;
  }

})();