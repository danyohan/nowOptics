const socket = io.connect();

/**
 * create a new note
 * @param {string} title note title
 * @param {string} description note description 
 * @param {string} date  note date
 */
export const saveNote = (title, description, date) => {
  socket.emit("client:newnote", {
    title,
    description,
    date
  });
};

/**
 * delete a note by id
 * @param {string} id note ID
 */
export const deleteNote = (id) => {
  socket.emit("client:deletenote", id);
};

/**
 *
 * @param {string} id note ID
 * @param {string} title note title
 * @param {string} description note description
 * @param {string} description note date
 */
export const  updateNote = (_id, title, description, date) => {
  socket.emit("client:updatenote", {
    _id,
    title,
    description,
    date
  });
};

/**
 * Load an Array of Notes
 * @param {function} callback A function to render Notes
 */
export const loadNotes = (callback) => {
  socket.on("server:loadnotes", callback);
};

export const onNewNote = (callback) => {
  socket.on("server:newnote", callback);
};

export const onSelected = (callback) => {
  socket.on("server:selectednote", callback);
};

export const getNoteById = (noteId) => {
  socket.emit("client:getnote", noteId);
};

export const alertSuccess = (callback) => {
  alertify.success('The note ha been created');
};
