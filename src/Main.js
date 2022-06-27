import  ReactMarkdown from "react-markdown"

//contains note currently being edited

function Main ({activeNote, onUpdateNote}) {

    const onEditField = (key,value) => {
        onUpdateNote({
            ...activeNote, // keep everything not modified the same
            [key]: value, // change title or body if modified
            lastModified: Date.now(),
        })
    }

    if (!activeNote) return <div className="no-active-note">No Note Selected</div>
    return (
    <div className="app-main">
        <div className="app-main-note-edit">
            <input type="text" id="title" value={activeNote.title} onChange = {(e)=> onEditField("title", e.target.value)} autoFocus/>
            <textarea id="body" placeholder="Write note here" value={activeNote.body} onChange = {(e)=> onEditField("body", e.target.value)}/>
        </div>
        <div className="app-main-note-preview">
            <h1 className="preview-title">{activeNote.title}</h1>
            <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>
        </div>
    </div>
    )
}

export default Main;