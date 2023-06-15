import {project, allProjects} from "./toDoClasses.js";

export default function newProjectOverlay() {
  // overlay elements
  const div = document.createElement("div");
  //form elements
  const form = document.createElement("form");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const submitButton = document.createElement("button");
  const closeFormButton = document.createElement("button");

  //div element attributes
  div.setAttribute("id","newProjectOverlay");

  //input element attributes
  input.setAttribute("type","text");
  input.setAttribute("name","projectName");

  //label element attributes
  label.setAttribute("for","projectName");
  label.textContent = "Enter project name: ";

  // button attributes
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click",(e) => {
    e.preventDefault();
    initializeNewProject(input.value);
    form.reset();
  });
  closeFormButton.textContent = "Close";
  closeFormButton.addEventListener("click", () => {
    div.remove();
  })

  form.append(label, input, submitButton, closeFormButton);
  div.appendChild(form);
  document.body.appendChild(div);
}

const initializeNewProject = (projectName) => {
  const allProject = new allProjects()
  allProject.addProject(new project(projectName))
  clearProjects();
  displayProjects();
}

// function to display our available projects
function displayProjects() {
  const projects = new allProjects();
  projects.getProjects().forEach(element => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = element.projectName;
    div.setAttribute("class","projects");
    div.appendChild(h3);
    
    const sideBar = document.getElementById("sideBar");
    sideBar.appendChild(div);
  });
}
// clears projects to prevent duplication when running the displayProjects function
function clearProjects() {
  document.querySelectorAll('.projects').forEach(e => e.remove());
}