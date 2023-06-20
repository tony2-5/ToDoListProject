import newProjectOverlay from "./newProjectOverlay.js";
import {project, allProjects} from "./toDoClasses.js";

// displays our dynamically generated sidebar
export const sideBarBody = (() => {
  initializeDefaultProject();
  displayProjects();
  createNewProject();
})() 

// function to add more projects
function createNewProject() {
  const sideBar = document.getElementById("sideBar");
  const newProjectButton = document.createElement("button");

  newProjectButton.textContent = "New Project";

  newProjectButton.addEventListener("click", newProjectOverlay)
  
  sideBar.appendChild(newProjectButton);
}

function initializeDefaultProject() {
    const allProject = new allProjects()
    const defaultProject = new project("Main")
    allProject.addProject(defaultProject);
    
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = defaultProject.projectName;
    div.setAttribute("id","defaultProject");
    div.addEventListener("click", currentSelectedProject(defaultProject.projectName));
    div.appendChild(h3);

    const sideBar = document.getElementById("sideBar");
    sideBar.appendChild(div);
}

// initializes a new project to display on the sideBar by first calling
export const initializeNewProject = (projectName) => {
  const allProject = new allProjects()
  allProject.addProject(new project(projectName))
  clearProjects();
  displayProjects();
}

// clears projects from DOM to prevent duplication when running the displayProjects function
function clearProjects() {
  document.querySelectorAll('.projects').forEach(e => e.remove());
}

// displays our projects on the sidebar
function displayProjects() {
  const projects = new allProjects();
  projects.getProjects().forEach(element => {
    if(element.projectName === "Main") {
      return;
    }
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = element.projectName;
    div.setAttribute("class","projects");
    // TODO: might be error in future
    div.addEventListener("click", currentSelectedProject(element.projectName));
    div.appendChild(h3);

    const sideBar = document.getElementById("sideBar");
    sideBar.appendChild(div);
  });
}

//function to change the currentProjectName in the allProjects class, keeps track of which todo list items to display
function currentSelectedProject(projectName) {
  const projects = new allProjects();
  projects.setCurrentProject(projectName);
}