const task = (id, title, dueDate, priority, description) => {
  let status = "To Do";

  let toggleStatus = () => {
    if (status =="To Do") {
      status = "Complete";
    } else {
      status = "To Do";
    }
  } 
  
  return { id, title, dueDate, priority, description, toggleStatus,
    get status() {
      return status;
    },  
    toJSON() {
      return {
        id: this.id,
        title: this.title,
        dueDate: this.dueDate,
        priority: this.priority,
        description: this.description,
        status: this.status
      }}, 
  }
};


export {
  task,
}