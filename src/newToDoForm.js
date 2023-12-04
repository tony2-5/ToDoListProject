import { formSubmit } from "./content.js";

// generate toDoForm for each project
export function newToDoForm() {
  // elements
  const content = document.getElementById("content");
  const div = document.createElement("div");
  //form elements
  const form = document.createElement("form");
  const inputTitle = document.createElement("input");
  const textArea = document.createElement("textarea");
  const inputDate = document.createElement("input");
  const select = document.createElement("select");
  const highPriority = document.createElement("option");
  const medPriority = document.createElement("option");
  const lowPriority = document.createElement("option");
  const labelTitle = document.createElement("label");
  const labelDescription = document.createElement("label");
  const labelDueDate = document.createElement("label");
  const labelPriority = document.createElement("label");
  const submitButton = document.createElement("button");

  //div element attributes
  div.setAttribute("id","addToDo");

  //input element attributes and label element attributes
  // title form input
  const titleDiv = document.createElement("div");
  titleDiv.setAttribute("id","formTitleDiv");
  labelTitle.setAttribute("for","title");
  labelTitle.textContent = "Title: ";
  inputTitle.setAttribute("type","text");
  inputTitle.setAttribute("name","title");
  titleDiv.append(labelTitle,inputTitle);

  //description area for form
  const descDiv = document.createElement("div");
  labelDescription.setAttribute("for","description");
  labelDescription.textContent = "Description: ";
  textArea.setAttribute("name","description");
  textArea.setAttribute("rows","3");
  textArea.setAttribute("cols","20");
  descDiv.append(labelDescription,textArea);

  // due date for form
  const dueDateDiv = document.createElement("div");
  labelDueDate.setAttribute("for","dueDate");
  labelDueDate.textContent = "Due Date: ";
  inputDate.setAttribute("type","date");
  inputDate.setAttribute("name","dueDate");
  dueDateDiv.append(labelDueDate,inputDate);

  // priority selection for form
  const priorityDiv = document.createElement("div");
  labelPriority.setAttribute("for","priority");
  labelPriority.textContent = "Priority: ";
  select.setAttribute("name","priority");
  highPriority.setAttribute("value","highPriority");
  highPriority.textContent = "High";
  medPriority.setAttribute("value","medPriority");
  medPriority.textContent = "Medium";
  lowPriority.setAttribute("value","lowPriority");
  lowPriority.textContent = "Low";
  select.append(highPriority, medPriority, lowPriority);
  priorityDiv.append(labelPriority, select);

  //submit button
  submitButton.addEventListener("click", formSubmit);
  submitButton.textContent = "Add To-Do";
  form.append(titleDiv, descDiv, dueDateDiv, priorityDiv, submitButton);

  div.appendChild(form)
  content.appendChild(div);
}
export function validationPopup() {
  const formTitleDiv = document.getElementById("formTitleDiv");
  const p = document.createElement("p");
  p.setAttribute("id","titleValidateMessage")
  p.textContent = "Title cannot be empty";
  formTitleDiv.appendChild(p);
}
export function removeValidationPopup() {
  if(document.getElementById("titleValidateMessage") === null)
    return;
  else
    document.getElementById("titleValidateMessage").remove();
}