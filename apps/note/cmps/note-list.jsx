import { NoteButtons } from "./note-buttons.jsx";
import { NotePreview } from "./note-preview.jsx";

export class NoteList extends React.Component {



    render() {
        const { notes, onChoseNote, onRemoveNote, onPinNote, onChangeNoteColor } = this.props
        if (!notes) return <h1>loading</h1>
        return (
            <section className="notes-container">
                {notes.map((note) => {
                    const { backgroundColor } = note.style
                    return (
                        <article className={`note ${backgroundColor}`} key={note.id}>
                            <NotePreview note={note} />
                            <section className="button-list">
                                <button onClick={() => onChoseNote(note)}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <NoteButtons onChangeNoteColor={onChangeNoteColor} onRemoveNote={onRemoveNote}
                                    onPinNote={onPinNote} noteId={note.id} note={note}/>
                            </section>
                        </article>

                    )
                })}
            </section>
        )
    }
}
