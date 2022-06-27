import './App.css';
import Main from './Main';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import {useEffect, useState} from "react";
import uuid from "react-uuid";

function App() {

  const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []); // load any notes from local storage into array, or load empty array if no notes in local storage

  const [activeNote, setActiveNote] = useState(false); // note currently being viewed

  const [darkMode, setDarkMode] = useState(false); // indicates if dark mode is on

  const [searchText, setSearchText] = useState('');

  // save notes to local storage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // creates new note with set info
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    }
    setNotes([newNote, ...notes]); // creates new array with old notes and new note
  }

  const onDeleteNote = (idToDelete) => {
    // for each note, check id and keep in array if not equal to id to be deleted
    // set new array as everything in old array except deleted note
    setNotes(notes.filter((note) => note.id !== idToDelete))
  }

  const onUpdateNote = (updatedNote) => {
    // for each note, check if current note id equals note being edited
    // if equal, modify note and replace; else keep original note
    const updatedNotesArr = notes.map((note) => {
      if(note.id === activeNote){
        return updatedNote;
      }
      return note; 
    })
    setNotes(updatedNotesArr);
  }

  // return current active note
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }



  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="App">
        <SearchBar handleSearchNote = {setSearchText}/>
        <Sidebar 
          notes={notes.filter((note) => note.body.toLowerCase().includes(searchText) || note.title.toLowerCase().includes(searchText))} // only include notes with text being searched 
          onAddNote={onAddNote} 
          onDeleteNote={onDeleteNote} 
          activeNote={activeNote} 
          setActiveNote={setActiveNote}
          toggleMode={setDarkMode}
        />
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
      </div>
    </div>
  );
}

export default App;
