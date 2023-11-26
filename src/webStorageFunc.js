import { allProjects } from "./toDoClasses";

export function setLocalStorage() {
  if (storageAvailable("localStorage")) {
    localStorage.setItem("projects", JSON.stringify(new allProjects().getProjects()));
  }
  else 
    console.log("Local storage not available");
}

export function persistData() {
  const projectArr = localStorage.getItem("projects");
  const projects = new allProjects();
  projects.persistProjects(JSON.parse(projectArr));
}

// testing function from mdn docs: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
