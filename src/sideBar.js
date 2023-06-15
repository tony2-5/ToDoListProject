import newProjectOverlay from "./newProjectOverlay.js";
import {project, allProjects} from "./toDoClasses.js";

// displays our dynamically generated sidebar
export const sideBarBody = (() => {
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