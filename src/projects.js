import { task } from './tasks.js';

const project = (id, name, tasks = {}) => {
  
  let maxID = -1;

  const addNewTask = (newTask) => {
    maxID += 1;
    let id = maxID;
    tasks[id] = newTask;
  }

  return { id, name, tasks, addNewTask, 
    get maxID() {
      return maxID;
    },
    get tasks() {
      return tasks;
    }
  }
};


export {
  project,
}