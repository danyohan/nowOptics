import { addNotes, renderNotes, fillForm, onHandleSubmit } from "../views/notes.js";
import { loadNotes, onNewNote, onSelectedNote } from "../sockets.js";

window.addEventListener("DOMContentLoaded", () => {
  loadNotes(renderNotes);
  onNewNote(addNotes);
  onSelectedNote(fillForm);
});

const noteForm = document.querySelector("#noteForm");
noteForm.addEventListener("submit", onHandleSubmit);

