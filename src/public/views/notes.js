import { deleteNote, getNoteById, saveNote, updateNote, alertSuccess } from "../sockets.js";

const notesList   = document.querySelector("#notes");
const title       = document.querySelector("#title");
const description = document.querySelector("#description");
const date        = document.querySelector("#date");

let noteId = "";

function formatDate(userDate) {
  return (new Date(userDate).toJSON().slice(0, 10).split('-').reverse().join('-'));
}

const noteUI = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body card-color rounded-4 animate__animated animate__fadeInUp mb-2">
  <h2 class="card-title">${note.title}</h2>
  <p>${note.description}</p>
  <p>${note.date}</p>
      <div class="d-flex justify-content-stretch">
          <button class="btn btn-outline-dark btn-sm update" data-id="${note._id}"><i class="fa fa-pencil"></i> Update</button>
          <button class="btn btn-outline-danger btn-sm delete" data-id="${note._id}"><i class="fa fa-trash" ></i> Delete</button>
      </div>
      <div class="d-flex justify-content-end updated">Updated <span>${formatDate(note.updatedAt)}</span></div>
  </div>
`;
  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () => deleteNote(btnDelete.dataset.id));
  btnUpdate.addEventListener("click", () => getNoteById(btnDelete.dataset.id));
  return div;
};


export const renderNotes = (notes) => {
  noteId = "";
  notesList.innerHTML = "";
  notes.forEach((note) => notesList.append(noteUI(note)));
  setColor()
};


export const setColor = () => {
  var x = document.getElementsByClassName("card-color");
  var i;
  var randomColor;
  var colorPair   = ['#e2f6d3', '#FBA1B7', "#ebb1e4", "#94ADD7"];
  var colorOdd = ['#a0ecc4', '#b4ddd3', '#d3bfdb', '#e9e3d4'];
  for (i = 0; i < x.length; i++) {
    if (i % 2 === 0) {
      randomColor = colorPair[Math.floor(Math.random() * colorPair.length | 0)]
    }
    else {
      randomColor = colorOdd[Math.floor(Math.random() * colorOdd.length | 0)]
    }

    x[i].style.backgroundColor = randomColor;
  }
}

export const addNotes = (note) => {
  notesList.append(noteUI(note));
};

export const fillForm = (note) => {
  title.value       = note.title;
  description.value = note.description;
  date.value        = note.date;
  noteId            = note._id;
};

export const onHandleSubmit = (e) => {
  e.preventDefault();

  if (title.value == "" || description.value == "") {
    alertify.error('Please fill in the title and description');
  }
  else {

    if (noteId) {
      updateNote(noteId, title.value, description.value, date.value);
    } else {
      saveNote(title.value, description.value, date.value);
      alertSuccess();
    }

    title.value = "";
    description.value = "";
    date.value = "";
  }

};
