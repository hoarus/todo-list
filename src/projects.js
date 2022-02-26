import { task } from './tasks.js';

const project = (id, name, tasks = []) => {
  
  let maxID = 0;

  let addNewTask = (newTask) => {
    newTask.id = maxID + 1;
    maxID += 1;
    tasks.push(newTask)
  }

  return { id, name, tasks, maxID, addNewTask };
};


export {
  project,
}