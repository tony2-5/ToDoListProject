import newProjectOverlay from "./newProjectOverlay.js";
import {project, allProjects} from "./toDoClasses.js";
import generateContent from "./content.js";
import { setLocalStorage,persistData } from "./webStorageFunc.js";
import trashImg from "./imgs/trash.svg";

// displays our dynamically generated sidebar
export const sideBarBody = (() => {
  if(!localStorage.getItem("projects")) {
    initializeDefaultProject();
    displayProjects();
    createNewProject();
  } else {
    persistData();
    initializeDefaultProject();
    createNewProject();
    displayProjects();
  }
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
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    let defaultProject;
    // update local storage
    if(!localStorage.getItem("projects")) {
      defaultProject = new project("Main")
      console.log("in func");
      allProject.addProject(defaultProject);
      setLocalStorage();
    } else {
      // set up default project to be default project from local storage and assign project type to object
      defaultProject = JSON.parse(localStorage.getItem("projects"))[0];
      defaultProject = Object.assign(new project(),defaultProject);
      defaultProject.assignToDoClass();
      // need to replace main project in project array after doing Object assign
      allProject.replaceMainProject(defaultProject);
    }
    console.log(defaultProject);
    h3.textContent = defaultProject.projectName;
    div.setAttribute("id","selectedProject");
    div.setAttribute("class","defaultProject");
    // event listener to generate todo items for project in content
    div.addEventListener("click",() => {
      document.querySelector("#selectedProject").removeAttribute("id");
      currentSelectedProject(defaultProject)
      document.getElementById("sideBar").children[0].setAttribute("id","selectedProject");
      generateContent(defaultProject)
    });
    div.appendChild(h3);

    const sideBar = document.getElementById("sideBar");
    sideBar.appendChild(div);
    generateContent(defaultProject);
}

// initializes a new project to display on the sideBar by first calling
export const initializeNewProject = (projectName) => {
  const allProject = new allProjects()
  allProject.addProject(new project(projectName))
  // update local storage
  setLocalStorage();

  clearProjects();
  displayProjects();
  // reinitializes id attribute for our current selected project
  // ensure current project isnt Main to prevent error where selectedProject id is given to button
  if(allProject.getCurrentProjectIndex() !== 0) {
    document.getElementById("sideBar").children[1+allProject.getCurrentProjectIndex()].setAttribute("id","selectedProject");
  }
}

// clears projects from DOM to prevent duplication when running the displayProjects function
function clearProjects() {
  document.querySelectorAll('.projects').forEach(e => e.remove());
}

// displays our projects on the sidebar
function displayProjects() {
  const projects = new allProjects();
  projects.getProjects().forEach(element => {
    if(element.projectName === "Main")
      return;
    const div = document.createElement("div");
    const trash = new Image(20,20);
    trash.src = trashImg;

    // event listener for deleting projects
    // if project currently on deleted defaults to Main, otherwise stays on current project
    trash.addEventListener("click",(e) => {
      projects.removeProject(element);
      // update local storage
      setLocalStorage();
      if(e.target.parentElement.hasAttribute("id")) {
        currentSelectedProject(projects.getProjects()[0]);
        generateContent(projects.getProjects()[0])
        document.querySelector(".defaultProject").setAttribute("id","selectedProject");
        clearProjects();
        displayProjects();
      } else {
        clearProjects();
        displayProjects();
        // reinitializes id attribute for our current selected project
        // ensure current project isnt Main to prevent error where selectedProject id is given to button
        if(projects.getCurrentProjectIndex() !== 0) {
          document.getElementById("sideBar").children[1+projects.getCurrentProjectIndex()].setAttribute("id","selectedProject");
        }
      }
    })
    const h3 = document.createElement("h3");
    h3.textContent = element.projectName;
    div.setAttribute("class","projects");

    // event listener to generate todo items for project in content
    h3.addEventListener("click",() => {
      console.log(element);
      document.querySelector("#selectedProject").removeAttribute("id");
      currentSelectedProject(element)
      // reinitializes id attribute for our current selected project
      // ensure current project isnt Main to prevent error where selectedProject id is given to button
      if(projects.getCurrentProjectIndex() !== 0) {
        document.getElementById("sideBar").children[1+projects.getCurrentProjectIndex()].setAttribute("id","selectedProject");
      }
      console.log(element);
      generateContent(element)
    });
    div.append(h3, trash);

    const sideBar = document.getElementById("sideBar");
    sideBar.appendChild(div);
  });
}

//function to change the currentProjectName in the allProjects class, keeps track of which todo list items to display
function currentSelectedProject(projectName) {
  const projects = new allProjects();
  projects.setCurrentProject(projectName);
}

