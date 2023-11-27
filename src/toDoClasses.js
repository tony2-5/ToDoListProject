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
  assignToDoClass() {
    for(let i = 0;i<this.itemArr.length; i++) {
      // giving persisted projects item array objects the toDoItem classes properties
      this.itemArr[i] = Object.assign(new toDoItem(),this.itemArr[i]);
    }
  }
}

// toDoItem class allowing to create our toDo's
export class toDoItem {
  static #lastKey = 0;
  checked = 0;
  constructor(title, description, dueDate, priority) {
    this.key = toDoItem.#lastKey++;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
  setTitle(title) {
    this.title = title;
  }
  setDescription(description) {
    this.description = description;
  }
  setdueDate(dueDate) {
    this.dueDate = dueDate;
  }
  setPriority(priority) {
    this.priority = priority;
  }
  changeCheckStatus() {
    this.checked = this.checked ? 0 : 1;
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
  persistProjects(projectArr) {
    for(let i = 0;i<projectArr.length; i++) {
      // giving persisted projects the classes properties
      let target = Object.assign(new project(),projectArr[i]);
      target.assignToDoClass();
      this.addProject(target);
    }
  }
  replaceMainProject(projectObj) {
    console.log(allProjects.#projectArray);
    allProjects.#projectArray[0] = projectObj;
    console.log(allProjects.#projectArray);
  }
  getCurrentProject() {
    for(let i = 0;i<allProjects.#projectArray.length; i++)
      if(allProjects.#projectArray[i].projectName === allProjects.#currentProjectName)
        return allProjects.#projectArray[i];
  }
  getCurrentProjectIndex() {
    for(let i = 0;i<allProjects.#projectArray.length; i++)
      if(allProjects.#projectArray[i].projectName === allProjects.#currentProjectName)
        return i;
  }
  setCurrentProject(project) {
    allProjects.#currentProjectName = project.projectName;
  }
  includesProject(projectName) {
    if(allProjects.#projectArray.find(element => element.projectName === projectName) != undefined)
      return true;
    else
      return false;
  }
}