import { project } from "./toDoClasses.js";
import generateContent from "./content.js";
import trashImg from "./imgs/trash.svg";

export function toDoItemOverlay(toDoItem, project) {
  const div = document.createElement("div");
  div.setAttribute("id","toDoOverlay");

  // dom element for each todo item for a project
  const trash = new Image(20,20);
  trash.src = trashImg;
  // event listener to delete todo item
  trash.addEventListener("click", () => {
    closeOverlay()
    project.removeToDo(toDoItem);
    generateContent(project);
  })
  const innerDiv = document.createElement('div');
  innerDiv.setAttribute("id", "toDoOverlayInnerDiv");
  const title = document.createElement("h2");
  title.textContent = toDoItem.title;
  const description = document.createElement("p");
  description.textContent = toDoItem.description;
  const dueDate = document.createElement("h2");
  dueDate.textContent = toDoItem.dueDate;
  const priority =  document.createElement("h2");
  priority.textContent = toDoItem.priority;
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close"
  closeButton.addEventListener("click", closeOverlay);

  innerDiv.append(title,description,dueDate,priority, trash, closeButton);
  div.appendChild(innerDiv);
  document.body.appendChild(div);
}

function closeOverlay() {
  document.getElementById("toDoOverlay").remove();
}