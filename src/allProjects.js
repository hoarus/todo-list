
const allProjects = (projects = {}) => {
  
  let maxID = -1;

  const addNewProject = (newProject) => {
    maxID += 1;
    let id = maxID;
    projects[id] = newProject;
  }

  let deleteProject = (id) => {
    delete projects[id];
  }

  return { projects, addNewProject, deleteProject,
    get maxID() {
      return maxID;
    },
    get projects() {
      return projects;
    }
  }
};


export {
  allProjects,
}