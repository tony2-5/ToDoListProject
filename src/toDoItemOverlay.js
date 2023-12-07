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
  const trash = new Image();
  trash.src = trashImg;
  trash.setAttribute("class","trashImg");
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
  const titleLabelDiv = document.createElement("div");
  const titleLabel = document.createElement("h3");
  const title = document.createElement("p");
  titleLabelDiv.setAttribute("class","overlayItemsDiv");

  titleLabel.textContent = "Title:"
  title.textContent = toDoItem.title;
  titleLabelDiv.append(titleLabel,title);
  editButtonArr[0].addEventListener("click", () => {
    // form
    const form = document.createElement("form");
    // input element for updating data
    const input = document.createElement("input");
    input.setAttribute("type","text");
    input.defaultValue = toDoItem.title;
    // update element
    const update = document.createElement("button");
    update.textContent = "Update";
    update.addEventListener("click", (e) => {
      toDoItem.setTitle(input.value); 
      generateContent(project);
      closeOverlay();
      toDoItemOverlay(toDoItem,project);
      setLocalStorage();
      e.preventDefault()
    });
    //cancel element
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (e) => {
      titleDiv.replaceChildren(titleLabelDiv, editButtonArr[0]);
      e.preventDefault();
    });

    form.append(input,update,cancel);
    titleDiv.replaceChildren(form);
  });
  titleDiv.append(titleLabelDiv, editButtonArr[0]);

  //toDo item description
  const descDiv = document.createElement("div");
  const descLabelDiv = document.createElement("div");
  const descLabel = document.createElement("h3");
  const description = document.createElement("p");
  descLabelDiv.setAttribute("class","overlayItemsDiv");

  descLabel.textContent = "Description:"
  description.textContent = toDoItem.description;
  descLabelDiv.append(descLabel,description);
  editButtonArr[1].addEventListener("click", () => {
    // form
    const form = document.createElement("form");
    // textarea for updating data
    const textarea = document.createElement("textarea");
    textarea.setAttribute("rows","3");
    textarea.setAttribute("cols","20");
    textarea.defaultValue = toDoItem.description;
    // update element
    const update = document.createElement("button");
    update.textContent = "Update";
    update.addEventListener("click", (e) => {
      toDoItem.setDescription(textarea.value); 
      generateContent(project);
      closeOverlay();
      toDoItemOverlay(toDoItem,project);
      setLocalStorage();
      e.preventDefault()
    });
    //cancel element
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (e) => {
      descDiv.replaceChildren(descLabelDiv, editButtonArr[1]);
      e.preventDefault();
    });

    form.append(textarea,update,cancel);
    descDiv.replaceChildren(form);
  });
  descDiv.append(descLabelDiv, editButtonArr[1]);

  //toDo item dueDate
  const dueDateDiv = document.createElement("div");
  const dueDate = document.createElement("p");
  const dateLabelDiv = document.createElement("div");
  const dateLabel = document.createElement("h3");
  dateLabelDiv.setAttribute("class","overlayItemsDiv");

  dateLabel.textContent = "Due Date:"
  console.log(toDoItem.dueDate);
  if(toDoItem.dueDate === null)
    dueDate.textContent = "No date set";
  else
    dueDate.textContent = toDoItem.dueDate;
  dateLabelDiv.append(dateLabel,dueDate);
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
      setLocalStorage();
      e.preventDefault()
    });
    //cancel element
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (e) => {
      dueDateDiv.replaceChildren(dateLabelDiv, editButtonArr[2]);
      e.preventDefault();
    });
    form.append(input,update,cancel);
    dueDateDiv.replaceChildren(form);
  });
  dueDateDiv.append(dateLabelDiv, editButtonArr[2]);

  //toDo item priority
  const priorityDiv = document.createElement("div");
  const priority =  document.createElement("p");
  const priorityLabelDiv = document.createElement("div");
  const priorityLabel = document.createElement("h3");
  priorityLabelDiv.setAttribute("class","overlayItemsDiv");

  priorityLabel.textContent = "Priority:"
  if(toDoItem.priority === "highPriority")
    priority.textContent = "High";
  else if(toDoItem.priority === "medPriority")
    priority.textContent = "Medium";
  else
    priority.textContent = "Low";
  priorityLabelDiv.append(priorityLabel, priority);
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
      setLocalStorage();
      e.preventDefault()
    });
    //cancel element
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", (e) => {
      priorityDiv.replaceChildren(priorityLabelDiv, editButtonArr[3]);
      e.preventDefault();
    });
    form.append(select,update,cancel);
    priorityDiv.replaceChildren(form);
  });
  priorityDiv.append(priorityLabelDiv, editButtonArr[3]);

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
