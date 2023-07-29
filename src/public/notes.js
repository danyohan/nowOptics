import { deleteNote, getNoteById, saveNote, updateNote } from "./sockets.js";

const notesList = document.querySelector("#notes");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");

let savedId = "";

const noteUI = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body card-color rounded-4 animate__animated animate__fadeInUp mb-2">
  <h3 class="card-title h3">${note.title}</h3>
  <p>${note.description}</p>
  <p>${note.date}</p>
      <div class="d-flex justify-content-stretch">
          <button class="btn btn-primary update" data-id="${note._id}">Update</button>
          <button class="btn btn-danger delete" data-id="${note._id}">Delete</button>
      </div>
  </div>
`;
  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () => deleteNote(btnDelete.dataset.id));
  btnUpdate.addEventListener("click", () => getNoteById(btnDelete.dataset.id));

  return div;
};


export const renderNotes = (notes) => {
  savedId = "";
  notesList.innerHTML = "";
  notes.forEach((note) =>
    notesList.append(noteUI(note)
    ));

};

export const setColor = () => {
  var x = document.getElementsByClassName("card-color");
  var i;
  var color = ["#F2C9BB", "#A0F2CC", "#FDE5EC", "#F6F4EB", "#91C8E4"];
  for (i = 0; i < x.length; i++) {
    const randomColor = color[Math.floor(Math.random() * color.length)]
    x[i].style.backgroundColor = randomColor;;
  }
  // const randomColor = Math.floor(Math.random()*16777215).toString(16);
  // document.getElementsByClassName('card').style.backgroundColor = "#" + randomColor;
}

export const appendNote = (note) => {
  notesList.append(noteUI(note));
};

export const fillForm = (note) => {
  title.value = note.title;
  description.value = note.description;
  date.value = note.date;
  savedId = note._id;
};

export const onHandleSubmit = (e) => {
  e.preventDefault();

  if (title.value == "" || description.value == "") {
    alertify.warning('Please fill in the title and description');
  }
  else {

    if (savedId) {
      updateNote(savedId, title.value, description.value);
    } else {
      saveNote(title.value, description.value, date.value);
    }

    title.value = "";
    description.value = "";
    date.value = "";
  }

};
