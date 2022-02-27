const task = (id, title, dueDate, priority, description) => {
  let status = "To Do";

  let toggleStatus = () => {
    if (status =="To Do") {
      status = "Complete";
    } else {
      status = "To Do";
    }
  }
  let setComplete = () => {
    status = "Complete";
  }

  let setToDo = () => {
    status = "To Do"
  }
  return { id, title, dueDate, priority, description, setComplete, setToDo, toggleStatus,
    get status() {
      return status;
    }, 
  };
};


export {
  task,
}