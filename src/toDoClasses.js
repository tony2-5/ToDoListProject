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
    this.itemArr = this.itemArr.filter(item => item.key !== toDoItem.key);
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
  static #currentProjectName = "Main";
  addProject(project) {
    allProjects.#projectArray.push(project);
  }
  removeProject(project) {
    allProjects.#projectArray = allProjects.#projectArray.filter(item => item.projectName !== project.projectName);
  }
  getProjects() {
    return allProjects.#projectArray;
  }
  getCurrentProject() {
    for(let i = 0;i<allProjects.#projectArray.length; i++) {
      if(allProjects.#projectArray[i].projectName === allProjects.#currentProjectName) {
        return allProjects.#projectArray[i];
      }
    }
  }
  getCurrentProjectIndex() {
    for(let i = 0;i<allProjects.#projectArray.length; i++) {
      if(allProjects.#projectArray[i].projectName === allProjects.#currentProjectName) {
        return i;
      }
    }
  }
  setCurrentProject(project) {
    allProjects.#currentProjectName = project.projectName;
  }
  includesProject(projectName) {
    if(allProjects.#projectArray.find(element => element.projectName === projectName) != undefined) {
      return true;
    } else {
      return false;
    }
  }
}