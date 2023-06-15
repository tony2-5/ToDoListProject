// project class allowing for different project pages for our toDo items
export class project {
  itemArr = [];
  constructor(projectName) {
    this.projectName = projectName;
  }
  addToDo(toDoItem) {
    this.itemArr.push(toDoItem);
  }
  removeToDo(toDoItem) {
    itemArr = itemArr.filter(item => item.key !== toDoItem.key);
  }
}

// toDoItem class allowing to create our toDo's
export class toDoItem {
  static #lastKey = 0;
  constructor(title, description, dueDate, priority) {
    this.key = toDoItem.#lastKey++;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

// class storing all the project class instances
export class allProjects {
  static #projectArray = []
  addProject(project) {
    allProjects.#projectArray.push(project);
  }
  removeProject(project) {
    allProjects.#projectArray = allProjects.projectArray.filter(item => item.projectName !== project.projectName);
  }
  getProjects() {
    return allProjects.#projectArray;
  }
}