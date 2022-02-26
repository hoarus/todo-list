import { task } from './tasks.js';

const project = (id, name, tasks = []) => {
  
  let maxID = -1;

  const addNewTask = (newTask) => {
    maxID += 1;
    tasks.push(newTask);
  }

  return { id, name, tasks, addNewTask, 
    get maxID() {
      return maxID;
    }}
};


export {
  project,
}