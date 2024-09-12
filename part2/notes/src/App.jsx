import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";
import noteService from "./service/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errMsg, setErrMsg] = useState("some Error Happened....");

  useEffect(() => {
    noteService.getAll().then((initialNote) => {
      setNotes(initialNote);
    });
  }, []);

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((err) => {
        setErrMsg(
          `the note ${note.content} was already deleted from the server`
        );
        setNotes(notes.filter((n) => n.id !== id));
      });

    setTimeout(() => {
      setErrMsg(null);
    }, 5000);
  };

  const addNotes = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (e) => {
    e.preventDefault();
    setNewNote(e.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMsg} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "Important" : "All"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>

      <form onSubmit={addNotes}>
        <input onChange={handleNoteChange} value={newNote} />
        <input type="submit" placeholder="Save" value={"save"} />
      </form>

      <Footer />
    </div>
  );
};

export default App;
