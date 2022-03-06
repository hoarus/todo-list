import { task } from './tasks.js';
import { project } from './projects.js';
import { AllProjects } from './allProjects.js';


// Check for Storage - Not Complete
function checkForLocalStorage() {
  if(localStorage.getItem('allProjects')) {
    return true;
  } else {
    return false;
  }    
}

function createDefaultProject(){
  let defaultProject = project(0, "My Default Project");
  let allProjects = AllProjects([ defaultProject ]);
  return allProjects;
}

// Save Functionality

function saveAllProjects(allProjects){
  localStorage.setItem('allProjects', JSON.stringify(allProjects));
  return;
}

// Load functionality


function loadAllProjects(){
  let allProjects = "";
  if (checkForLocalStorage() == true) {
    let storedProjects = JSON.parse(localStorage.getItem('allProjects'));
    allProjects = recreateAllProjects(storedProjects); 
  } else {
    allProjects = createDefaultProject();
  }
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
    allTasks.push(newTask)
  }
  return allTasks;
}

export {
 checkForLocalStorage,
 saveAllProjects,
 loadAllProjects,
};