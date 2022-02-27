import { task } from './tasks.js';

const project = (id, name, tasks = {}) => {
  
  let maxID = -1;

  const addNewTask = (newTask) => {
    maxID += 1;
    let id = maxID;
    tasks[id] = newTask;
  }

  let deleteTask = (id) => {
    delete tasks[id];
  }

  return { id, name, tasks, addNewTask, deleteTask,
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