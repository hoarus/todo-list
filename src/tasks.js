const task = (id, title, dueDate, priority, description) => {
  let status = "To Do";

  let setComplete = () => {
    status = "Complete";
  }

  let setToDo = () => {
    status = "To Do"
  }
  return { id, title, dueDate, priority, description, status, setComplete, setToDo };
};


export {
  task,
}