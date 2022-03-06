//Functions

import { task } from './tasks.js';
import { project } from './projects.js';
import { updateCurrentProject, updateCurrentProjectPosition } from './index.js';
import './stylesheets/normalise.css'
import './stylesheets/style.css';
import { AllProjects } from './allProjects.js';
import { checkForLocalStorage, saveAllProjects, loadAllProjects } from './saveAndLoad.js';


// Private

const DOMstuff = () => {

  // DRIVER
  let allProjects = loadAllProjects();
  let currentProject = allProjects.projects[0];
  let currentProjectPosition = 0;
  renderProject(currentProject);

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

  function hideAllForms(){
    let allFormContainers = document.querySelectorAll(".form-container");
    for (const container of allFormContainers) {
      container.classList.add("hidden");
    }
  }

  // Public 
  function displayTaskForm() {
    hideAllForms();
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
    hideAllForms();
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
    hideAllForms();
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
    hideAllForms();
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
    projectName.value = "";
    let newProject = project( name);
    hideNewProjectForm();
    return newProject;
  }

  function renderProject(currentProject) {
    updateProjectHeader(currentProject);
    renderTasks(currentProject);
  }


  // Delete Project 
  function displayDeleteProjectForm() {
    hideAllForms();
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

  // TESTING HERE

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

    // Delete Project
    let deleteProjectButton = document.querySelector(".delete-project");
    let closeDeleteProjectFormButton = document.querySelector(".close-delete-project-form");
    let confirmDeleteProjectButton = document.querySelector(".confirm-delete-project");

    // All Form Containers
    let allFormContainers = document.querySelectorAll("form-container");

    // General
    let saveButton = document.querySelector(".save");


    // Event Listeners
    saveButton.addEventListener("click", () => {
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
      currentProjectPosition = newProjectPosition;
      currentProject = allProjects.projects[newProjectPosition];
      renderProject(currentProject);
    })



    // Delete Project
    deleteProjectButton.addEventListener("click", () => {
      displayDeleteProjectForm();
    });

    closeDeleteProjectFormButton.addEventListener("click", () => {
      hideDeleteProjectForm();
    });

    confirmDeleteProjectButton.addEventListener("click", () => {
      allProjects.deleteProject(currentProjectPosition);
      hideDeleteProjectForm();
      currentProject = allProjects.projects[0];
      currentProjectPosition = 0;
      renderProject(currentProject);
    });


    function updateCurrentProject(newCurrentProject){
      currentProject  = newCurrentProject;
      renderProject(currentProject);
    }

    function updateCurrentProjectPosition(newPosition){
      currentProjectPosition = newPosition;
    }
  }
export {
  DOMstuff
};