import Notes from "../models/notes";
import LogModel from "../models/logs";
import Log from "../lib/log";
import TypeError from "../lib/logEnum";

export default (io) => {
  io.on("connection", (socket) => {

    const getNotes = async () => {
      const notes = await Notes.find();
      io.emit("server:loadnotes", notes);
    };

    getNotes();

    socket.on("client:newnote", async (data) => {
      try {
        const newNotes = new Notes(data);
        const savedNote = await newNotes.save();
        io.emit("server:newnote", savedNote);

      } catch (error) {
        Log({
          info: error,
          type: TypeError.Error,
          function: "newnote"
        }, LogModel);
      }
    });

    socket.on("client:deletenote", async (noteId) => {
      await Notes.findByIdAndDelete(noteId);
      getNotes();
    });

    socket.on("client:getnote", async (noteId) => {
      const note = await Notes.findById(noteId);
      socket.emit("server:selectednote", note);
    });

    socket.on("client:updatenote", async (updatedNotes) => {
      try {
        await Notes.findByIdAndUpdate(updatedNotes._id, {
          title: updatedNotes.title,
          description: updatedNotes.description,
          date: updatedNotes.date
        });

        getNotes();

      } catch (error) {
        Log({
          info: error,
          type: TypeError.Error,
          function: "updatenote"
        }, LogModel);
      }
    });

    socket.on("disconnect", () => {
      Log({
        info: "The application has been desconected",
        type: TypeError.Log,
        function: "disconnect"
      }, LogModel);
    });

  });
};
