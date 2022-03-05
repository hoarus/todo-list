import { task } from './tasks.js';
import { project } from './projects.js';
import { AllProjects } from './allProjects.js';


// Check for Storage - Not Comlete
function checkForLocalStorage() {
  if(!localStorage.getItem('allProjects')) {
    let defaultProject = JSON.parse(localStorage.getItem('currentProject'));
    convertStorageToProject(storedItem);
    return 
  } else {
    setStyles();
  }    
}

// Save Functionality

function saveAllProjects(currentProject){
  let allProjectsToStore = AllProjects([ currentProject] );
  localStorage.setItem('allProjects', JSON.stringify(allProjectsToStore));
  return;
}

// Load functionality


function loadAllProjects(){
  let storedProjects = JSON.parse(localStorage.getItem('allProjects'));
  console.log(storedProjects);
  let allProjects = recreateAllProjects(storedProjects);
  return allProjects;
}

// Private Load Functionality

function recreateAllProjects(storedProjects) {
  let allProjectsArray = []
  for (const key in storedProjects.projects) {
    let storedProject = storedProjects.projects[key];
    let newProject = recreateProject(storedProject);
    allProjectsArray.push(newProject);
  }
  let allProjects = AllProjects(allProjectsArray);
  return allProjects;
}


function recreateProject(storedProject){
  let id = storedProject.id;
  let name = storedProject.name;
  let newProject = project(id, name);
  let storedTasks = recreateAllTasks(storedProject);
  for (const task of storedTasks) {
    newProject.addNewTask(task);
  }
  return newProject;
}

function recreateAllTasks(storedProject){
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

export {
 checkForLocalStorage,
 saveAllProjects,
 loadAllProjects,
};