import {HiOutlinePlus} from "react-icons/hi"
import {MdOutlineDarkMode} from "react-icons/md"
import {RiDeleteBin6Line} from "react-icons/ri"

// contains all notes

function Sidebar({notes, onAddNote, onDeleteNote, activeNote, setActiveNote, toggleMode, handleSearchNote}) {

    const sortedNotes = notes.sort((a,b) => b.lastModified - a.lastModified); // keeps recently modified notes at top

    return <div className="app-sidebar">
        <div className="app-sidebar-header">
            <button onClick={() => toggleMode((previousDarkMode) => !previousDarkMode)}><MdOutlineDarkMode size={20}/></button>
            <h1>Notes</h1>
            <button onClick={onAddNote}><HiOutlinePlus size={20}/></button>
        </div>
        <div className="app-sidebar-notes">
            {sortedNotes.map((note) => (
                <div className={`app-sidebar-note ${note.id === activeNote && "active"}`} onClick={() => setActiveNote(note.id)}>
                    <div className="sidebar-note-title">
                        <strong>{note.title}</strong>
                        <button onClick={() => onDeleteNote(note.id)}><RiDeleteBin6Line size={15}/></button>
                    </div>
                    <p>{note.body && note.body.substr(0,100) + "..."}</p> 
                    <small className="note-meta">{new Date(note.lastModified).toLocaleDateString("en-US", {hour:"2-digit", minute: "2-digit"})}</small>
                </div>
            ))}
        </div>
    </div>
}

export default Sidebar;