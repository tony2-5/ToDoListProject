import newToDoForm from "./newToDoForm.js";
import { allProjects, project, toDoItem } from "./toDoClasses.js";

export default function generateContent(project) {
  clearContent();
  newToDoForm();
  toDoItems(project);
};

//adToDo to project class instance
function addToDo(project, toDoItem) {
  project.addToDo(toDoItem);
}

export function formSubmit(e) {
  e.preventDefault();
  const allProject= new allProjects();
  const formData = new FormData(e.target.form);
  addToDo(allProject.getCurrentProject(), new toDoItem(formData.get("title"), formData.get("description"), formData.get("dueDate"),formData.get("priority")));
  clearContent();
  generateContent(allProject.getCurrentProject());
  e.target.form.reset();
}

// display toDoItems in content area
function toDoItems(project) {
  project.itemArr.forEach(element => {
    // dom element for each todo item for a project
    const content = document.getElementById("content");
    const div = document.createElement("div");
    div.setAttribute("class", "toDoItem");
    const title = document.createElement("h2");
    title.textContent = element.title;
    const description = document.createElement("h2");
    description.textContent = element.description;
    const dueDate = document.createElement("h2");
    dueDate.textContent = element.dueDate;
    const priority =  document.createElement("h2");
    priority.textContent = element.priority;
    div.append(title, description, dueDate, priority);
    content.appendChild(div);
  });
}

// called after each new to do item added as to prevent duplication
function clearContent() {
  const content = document.getElementById("content");
  content.replaceChildren();
}