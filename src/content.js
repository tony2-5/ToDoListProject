import { parse,format } from 'date-fns';
import newToDoForm from "./newToDoForm.js";
import { allProjects, toDoItem } from "./toDoClasses.js";
import { toDoItemOverlay } from "./toDoItemOverlay.js";
import { persistData, setLocalStorage } from './webStorageFunc.js';

export default function generateContent(project) {
  clearContent();
  newToDoForm();
  toDoItems(project);
};

//addToDo to project class instance
function addToDo(project, toDoItem) {
  project.addToDo(toDoItem);
}

export function formSubmit(e) {
  e.preventDefault();
  const allProject= new allProjects();
  const formData = new FormData(e.target.form);
  if(!formData.get("dueDate")) {
    addToDo(allProject.getCurrentProject(), new toDoItem(formData.get("title"), formData.get("description"), null,formData.get("priority")));
  }
  else
    addToDo(allProject.getCurrentProject(), new toDoItem(formData.get("title"), formData.get("description"), format(parse(formData.get("dueDate"), 'yyyy-mm-dd', new Date()),'mm/dd/yyyy'),formData.get("priority")));
  //update local storage
  setLocalStorage()
  
  generateContent(allProject.getCurrentProject());
  e.target.form.reset();
}

// display toDoItems in content area
function toDoItems(project) {
  project.itemArr.forEach(element => {
    //open edit overlay
    const overlayButton = document.createElement("button");
    overlayButton.textContent = "View To-Do";
    overlayButton.addEventListener("click", () => {
      toDoItemOverlay(element, project);
    });

    const content = document.getElementById("content");
    const div = document.createElement("div");
    div.setAttribute("class", "toDoItem");
    const title = document.createElement("h2");
    title.textContent = element.title;
    const dueDate = document.createElement("h2");
    dueDate.textContent = element.dueDate;
    div.append(title, dueDate, overlayButton);
    content.appendChild(div);
  });
}

// called after each new to do item added as to prevent duplication
function clearContent() {
  const content = document.getElementById("content");
  content.replaceChildren();
}