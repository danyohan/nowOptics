import { appendNote, renderNotes, fillForm, onHandleSubmit } from "./notes.js";
import { loadNotes, onNewNote, onSelected } from "./sockets.js";

window.addEventListener("DOMContentLoaded", () => {
  loadNotes(renderNotes);
  onNewNote(appendNote);
  onSelected(fillForm);
});


const noteForm = document.querySelector("#noteForm");
noteForm.addEventListener("submit", onHandleSubmit);

