import { parse,format } from 'date-fns';
import newToDoForm from "./newToDoForm.js";
import { allProjects, toDoItem } from "./toDoClasses.js";
import { toDoItemOverlay } from "./toDoItemOverlay.js";
import { setLocalStorage } from './webStorageFunc.js';
import exclaimationImg from "./imgs/exclaimation.svg";

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

    const checkBox = document.createElement("input");
    const checkBoxDiv = document.createElement("div");
    checkBox.setAttribute("type","checkbox");
    if(element.checked) {
      title.style.textDecoration = "line-through";
      dueDate.style.textDecoration = "line-through";
      checkBoxDiv.style.backgroundColor = "#E8fbc4";
      div.style.borderColor = "#E8fbc4";
      checkBox.checked = true;
    }
    checkBox.addEventListener("change",(e) => {
      if(e.target.checked) {
        title.style.textDecoration = "line-through";
        dueDate.style.textDecoration = "line-through";
        checkBoxDiv.style.backgroundColor = "#E8fbc4";
        e.target.parentNode.parentNode.style.borderColor = "#E8fbc4";
        element.changeCheckStatus();
        setLocalStorage();
      } else {
        title.style.textDecoration = "none";
        dueDate.style.textDecoration = "none";
        checkBoxDiv.style.backgroundColor = "#f3cdd0";
        e.target.parentNode.parentNode.style.borderColor = "#f3cdd0";
        element.changeCheckStatus();
        setLocalStorage();
      }
    });
    checkBoxDiv.append(checkBox)

    let exclaimationAmount;
    let colorStr;
    if(element.priority === "highPriority") {
      exclaimationAmount = 3;
      colorStr = "invert(10%) sepia(77%) saturate(7299%) hue-rotate(4deg) brightness(89%) contrast(95%)";
    } else if(element.priority === "medPriority") {
      exclaimationAmount = 2;
      colorStr = "invert(66%) sepia(63%) saturate(477%) hue-rotate(14deg) brightness(92%) contrast(91%)";
    } else {
      exclaimationAmount = 1;
      colorStr = "invert(70%) sepia(35%) saturate(1109%) hue-rotate(60deg) brightness(88%) contrast(86%)";
    }
    const exclaimations = [];
    for(let i=0; i<exclaimationAmount; i++) {
      exclaimations.push(new Image(20,20));
      exclaimations[i].src = exclaimationImg;
      exclaimations[i].setAttribute("class","exclaimation");
      exclaimations[i].style.filter = colorStr;
    }
    console.log(element.priority);
    div.append(checkBoxDiv, ...exclaimations, title, dueDate, overlayButton);
    content.appendChild(div);
  });
}

// called after each new to do item added as to prevent duplication
function clearContent() {
  const content = document.getElementById("content");
  content.replaceChildren();
}