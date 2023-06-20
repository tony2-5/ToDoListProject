import { initializeNewProject } from "./sideBar.js";

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
    // ensure project name isnt empty
    if(input.value.trim().length === 0) {
      e.preventDefault();
      alert("Project name cannot be empty!");
    } else {
      e.preventDefault();
      initializeNewProject(input.value);
      form.reset();
    }
  });
  closeFormButton.textContent = "Close";
  closeFormButton.addEventListener("click", () => {
    div.remove();
  })

  form.append(label, input, submitButton, closeFormButton);
  div.appendChild(form);
  document.body.appendChild(div);
}
