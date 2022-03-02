import { project } from "./projects";

const AllProjects = (projects = []) => {
  
  let maxID = -1;

  const addNewProject = (newProject) => {
    projects.push(newProject);
  }

  let deleteProject = (id) => {
    console.log("Function not configured");
    // delete projects[id];
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