import { addNotes, renderNotes, fillForm, onHandleSubmit } from "../views/notes.js";
import { loadNotes, onNewNote, onSelected } from "../sockets.js";

window.addEventListener("DOMContentLoaded", () => {
  loadNotes(renderNotes);
  onNewNote(addNotes);
  onSelected(fillForm);
});

const noteForm = document.querySelector("#noteForm");
noteForm.addEventListener("submit", onHandleSubmit);

