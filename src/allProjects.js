import { project } from "./projects";

const AllProjects = (projects = []) => {
  
  let maxID = -1;

  const addNewProject = (newProject) => {
    projects.push(newProject);
  }

  let deleteProject = (position) => {
    projects.splice(position, 1);
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
  AllProjects,
}