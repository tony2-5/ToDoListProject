import { parse,format } from 'date-fns';
import { project } from "./toDoClasses.js";
import generateContent from "./content.js";
import { setLocalStorage } from "./webStorageFunc.js";
import trashImg from "./imgs/trash.svg";
import editButton from "./imgs/editButton.svg";

export function toDoItemOverlay(toDoItem, project) {
  const div = document.createElement("div");
  div.setAttribute("id","toDoOverlay");

  // trash icon for deleting 
  const trash = new Image(20,20);
  trash.src = trashImg;
  // event listener to delete todo item
  trash.addEventListener("click", () => {
    closeOverlay()
    project.removeToDo(toDoItem);
    //update local storage
    setLocalStorage();
    generateContent(project);
  })

  // edit icon for editing
  const editButtonArr = []
  for(let i = 0;i<4;i++) {
    editButtonArr.push(new Image(20,20))
    editButtonArr[i].src = editButton;
  }
  // dom element for each todo item for a project
  const innerDiv = document.createElement('div');
  innerDiv.setAttribute("id", "toDoOverlayInnerDiv");

  //toDo item title
  const titleDiv = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = toDoItem.title;
  editButtonArr[0].addEventListener("click", () => {
    // form
    const form = document.createElement("form");
    // input element for updating data
    const input = document.createElement("input");
    input.setAttribute("type","text");
    // update element
    const update = document.createElement("button");
    update.textContent = "Update";
    update.addEventListener("click", (e) => {
      toDoItem.setTitle(input.value); 
      generateContent(project);
      closeOverlay();
      toDoItemOverlay(toDoItem,project);
      e.preventDefault()
    });
    //cancel element
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (e) => {
      titleDiv.replaceChildren(title, editButtonArr[0]);
      e.preventDefault();
    });

    form.append(input,update,cancel);
    titleDiv.replaceChildren(form);
  });
  titleDiv.append(title, editButtonArr[0]);

  //toDo item description
  const descDiv = document.createElement("div");
  const description = document.createElement("p");
  description.textContent = toDoItem.description;
  editButtonArr[1].addEventListener("click", () => {
    // form
    const form = document.createElement("form");
    // textarea for updating data
    const textarea = document.createElement("textarea");
    textarea.setAttribute("rows","3");
    textarea.setAttribute("cols","20");
    // update element
    const update = document.createElement("button");
    update.textContent = "Update";
    update.addEventListener("click", (e) => {
      toDoItem.setDescription(textarea.value); 
      generateContent(project);
      closeOverlay();
      toDoItemOverlay(toDoItem,project);
      e.preventDefault()
    });
    //cancel element
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (e) => {
      titleDiv.replaceChildren(description, editButtonArr[1]);
      e.preventDefault();
    });

    form.append(textarea,update,cancel);
    descDiv.replaceChildren(form);
  });
  descDiv.append(description, editButtonArr[1]);

  //toDo item dueDate
  const dueDateDiv = document.createElement("div");
  const dueDate = document.createElement("h2");
  dueDate.textContent = toDoItem.dueDate;
  editButtonArr[2].addEventListener("click", () => {
    // form
    const form = document.createElement("form");
    // input date for updating data
    const input = document.createElement("input");
    input.setAttribute("type","date");
    // update element
    const update = document.createElement("button");
    update.textContent = "Update";
    update.addEventListener("click", (e) => {
      if(!input.value)
        toDoItem.setdueDate("");
      else
        toDoItem.setdueDate(format(parse(input.value, 'yyyy-mm-dd', new Date()),'mm/dd/yyyy')); 
      generateContent(project);
      closeOverlay();
      toDoItemOverlay(toDoItem,project);
      e.preventDefault()
    });
    //cancel element
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (e) => {
      titleDiv.replaceChildren(dueDate, editButtonArr[2]);
      e.preventDefault();
    });
    form.append(input,update,cancel);
    dueDateDiv.replaceChildren(form);
  });
  dueDateDiv.append(dueDate, editButtonArr[2]);

  //toDo item priority
  const priorityDiv = document.createElement("div");
  const priority =  document.createElement("h2");
  priority.textContent = toDoItem.priority;
  editButtonArr[3].addEventListener("click", () => {
    // form
    const form = document.createElement("form");
    // select for updating data
    const select = document.createElement("select");
    const highPriority = document.createElement("option");
    highPriority.setAttribute("value","highPriority");
    highPriority.textContent = "High";
    const medPriority = document.createElement("option");
    medPriority.setAttribute("value","medPriority");
    medPriority.textContent = "Medium";
    const lowPriority = document.createElement("option");
    lowPriority.setAttribute("value","lowPriority");
    lowPriority.textContent = "Low";
    select.append(highPriority, medPriority, lowPriority);
    // update element
    const update = document.createElement("button");
    update.textContent = "Update";
    update.addEventListener("click", (e) => {
      toDoItem.setPriority(select.value)
      generateContent(project);
      closeOverlay();
      toDoItemOverlay(toDoItem,project);
      e.preventDefault()
    });
    //cancel element
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (e) => {
      titleDiv.replaceChildren(dueDate, editButtonArr[3]);
      e.preventDefault();
    });
    form.append(select,update,cancel);
    priorityDiv.replaceChildren(form);
  });
  priorityDiv.append(priority, editButtonArr[3]);

  //close overlay
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close"
  closeButton.addEventListener("click", closeOverlay);

  innerDiv.append(titleDiv,descDiv,dueDateDiv,priorityDiv, trash, closeButton);
  div.appendChild(innerDiv);
  document.body.appendChild(div);
}

function closeOverlay() {
  document.getElementById("toDoOverlay").remove();
}
