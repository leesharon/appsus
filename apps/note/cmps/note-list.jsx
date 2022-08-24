import { NoteButtons } from "./note-buttons.jsx";
import { NotePreview } from "./note-preview.jsx";
const { withRouter } = ReactRouterDOM

class _NoteList extends React.Component {



    render() {
        const { notes,onChoseNote,onRemoveNote,onPinNote } = this.props
        const { onOpenEdit } = this
        if (!notes) return <h1>loading</h1>
        return (
            <section className="notes-container">
                {notes.map((note) => {
                    const { backgroundColor } = note.style
                    return (
                        <article className={`note ${backgroundColor}`} key={note.id}>
                            <NotePreview note={note} />
                            <section className="button-list">
                                <button onClick={() => onChoseNote(note)}>Edit</button>
                                <NoteButtons onRemoveNote={onRemoveNote} onPinNote={onPinNote} noteId={note.id}/>
                            </section>
                        </article>

                    )
                })}
            </section>
        )
    }
}

export const NoteList = withRouter(_NoteList)