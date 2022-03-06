//Functions

import { task } from './tasks.js';
import { project } from './projects.js';
import { updateCurrentProject, updateCurrentProjectPosition } from './index.js';

// Private

function displayItem(item) {
  item.classList.remove("hidden");
}

function hideItem(item) {
  item.classList.add("hidden");
}

function createElement(type, classname, content, id) {
  const newElement = document.createElement(type);
  newElement.setAttribute('class',classname);
  if (typeof id !="undefined" ) {
    newElement.setAttribute('id', id);
  }
  newElement.textContent = content;
  return newElement;
}

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

// Public 
function displayTaskForm() {
  let pageWrapper = document.querySelector(".page-wrapper");
  let taskForm = document.querySelector(".task-form-container");
  displayItem(taskForm);
  pageWrapper.classList.add("dimmed");
}

function hideTaskForm() {
  let taskForm = document.querySelector(".task-form-container");
  let pageWrapper = document.querySelector(".page-wrapper");
  let form = document.querySelector(".task-form");
  form.reset();
  hideItem(taskForm);
  pageWrapper.classList.remove("dimmed");
}

function createTaskFromForm (project) {
  let id = project.maxID + 1;
  let title = document.querySelector("#title").value;
  let dueDate = document.querySelector("#due-date").value;
  let priority = document.querySelector("#priority").value;
  let description = document.querySelector("#description").value;
  let newTask = task(id, title, dueDate, priority, description);
  return newTask;
}

function createTask(task){
  const newTask = createElement("div", "task","", task.id);
  const taskMin = createElement("div", "minimise");
  taskMin.classList.add("maximise");
  const taskDel = createElement("div", "delete");
  const taskCheck = createElement("div", "check");
  const taskTitle = createElement("h3", "task-title", task.title);
  const taskDate = createElement("p", "task-date", task.dueDate);
  taskDate.classList.add("hidden");
  const taskPriority = createElement("p", "task-priority", task.priority);
  taskPriority.classList.add("hidden");
  const taskDescription = createElement("p", "task-description", task.description);
  taskDescription.classList.add("hidden");

  newTask.appendChild(taskDel);
  newTask.appendChild(taskMin);
  newTask.appendChild(taskCheck);
  newTask.appendChild(taskTitle);
  newTask.appendChild(taskPriority);
  newTask.appendChild(taskDate);
  newTask.appendChild(taskDescription);

  let parent = "";
  if (task.status == "To Do") {
    parent = document.querySelector(".to-do-container");
  } else {
    parent = document.querySelector(".completed-container");
    taskCheck.classList.add("complete");
  }

  parent.appendChild(newTask);
}

function completeTask(task, destination, project) {
  let currentTask = project.tasks[task.id];
  currentTask.toggleStatus();
  renderTasks(project);
  console.log(currentTask);
}

function setTaskListeners(project) {
  let checkBoxes = document.getElementsByClassName("check");
  for (const checkBox of checkBoxes) {
    checkBox.addEventListener("click", () => {
      let task = checkBox.parentElement;
      let completedContainer = document.querySelector(".completed-container");
      completeTask(task, completedContainer, project);
    });
  }
  let minimiseBoxes = document.getElementsByClassName("minimise");
  for (const minimiser of minimiseBoxes) {
    minimiser.addEventListener("click", () => {
      let task = minimiser.parentElement;
      hideDetailedElements(task);
    });
  }
  let deleteBoxes = document.getElementsByClassName("delete");
  for (const deleteBox of deleteBoxes) {
    deleteBox.addEventListener("click", () => {
      let task = deleteBox.parentElement;
      project.deleteTask(task.id);
      task.remove();
    });
  }
  

};

function deleteTask(task) {
  console.log(task);
  
}

function renderTasks(project){
  let oldTasks = document.querySelectorAll(".task");
  for (const task of oldTasks) {
    task.remove();
  }
  for (const key in project.tasks) {
    let task = project.tasks[key];
    createTask(task);
  }

  setTaskListeners(project);
}

function updateProjectHeader(currentProject){
    let projectHeader = document.querySelector(".project-header");
    projectHeader.textContent = currentProject.name;
}

function displayProjectNameForm(currentProject){
  let container = document.querySelector(".edit-project-name-container");
  displayItem(container);
  let pageWrapper = document.querySelector(".page-wrapper");  
  pageWrapper.classList.add("dimmed");
  let input = document.querySelector(".edit-project-name-input");
  input.value = currentProject.name;
}

function hideProjectNameForm() {
  let container = document.querySelector(".edit-project-name-container");
  let pageWrapper = document.querySelector(".page-wrapper");
  hideItem(container);
  pageWrapper.classList.remove("dimmed");
}

// Select Project Form
function displaySelectProjectForm(allProjects) {
  let container = document.querySelector(".select-project-container");
  displayItem(container);
  let pageWrapper = document.querySelector(".page-wrapper");  
  pageWrapper.classList.add("dimmed");
  displayProjectSelectors(allProjects);
}

function displayProjectSelectors(allProjects) {
  let form = document.querySelector(".select-project-form");
  let oldButtons = document.querySelectorAll(".select-this-project");
  for (const button of oldButtons) {
    button.remove();
  }
  for (let key in allProjects.projects) {
    let project = allProjects.projects[key]
    console.log(project);
    let id = `select-project-${key}`; 
    const projectButton = createElement("button", "select-this-project", project.name, id);
    projectButton.type = "button";
    form.appendChild(projectButton);
  }
  setProjectSelectorListeners(allProjects);
}

function setProjectSelectorListeners(allProjects) {
  let projectSelectors = document.getElementsByClassName("select-this-project");
  for (const selector of projectSelectors) {
    selector.addEventListener("click", () => {
      let projectPosition = (selector.id).substring(15);
      let project = allProjects.projects[projectPosition]
      hideSelectProjectForm()
      updateCurrentProject(project);
      updateCurrentProjectPosition(projectPosition);
    });
  }}

function hideSelectProjectForm() {
  let container = document.querySelector(".select-project-container");
  let pageWrapper = document.querySelector(".page-wrapper");
  hideItem(container);
  pageWrapper.classList.remove("dimmed");
}

// New Project Form

function displayNewProjectForm(){
  let container = document.querySelector(".new-project-container");
  displayItem(container);
  let pageWrapper = document.querySelector(".page-wrapper");  
  pageWrapper.classList.add("dimmed");
}

function hideNewProjectForm() {
  let container = document.querySelector(".new-project-container");
  let pageWrapper = document.querySelector(".page-wrapper");
  hideItem(container);
  pageWrapper.classList.remove("dimmed");
}

function createProjectFromForm () {
  let projectName = document.querySelector("#project-name");
  let name = projectName.value;
  let id = 2;
  projectName.value = "";
  let newProject = project(id, name);
  hideNewProjectForm();
  return newProject;
}

function renderProject(currentProject) {
  updateProjectHeader(currentProject);
  renderTasks(currentProject);
}


// Delete Project 
function displayDeleteProjectForm() {
  let container = document.querySelector(".delete-project-container");
  displayItem(container);
  let pageWrapper = document.querySelector(".page-wrapper");  
  pageWrapper.classList.add("dimmed");
}

function hideDeleteProjectForm() {
  let container = document.querySelector(".delete-project-container");
  let pageWrapper = document.querySelector(".page-wrapper");
  hideItem(container);
  pageWrapper.classList.remove("dimmed");
}

export {
  displayTaskForm,
  hideTaskForm,
  createTask,
  completeTask,
  createTaskFromForm,
  setTaskListeners,
  renderTasks,
  updateProjectHeader,
  displayProjectNameForm,
  hideProjectNameForm,
  displaySelectProjectForm,
  hideSelectProjectForm, 
  displayNewProjectForm,
  hideNewProjectForm,
  createProjectFromForm,
  renderProject,
  displayDeleteProjectForm,
  hideDeleteProjectForm,
};