import { NotePreview } from "./note-preview.jsx";
const { withRouter } = ReactRouterDOM

class _NoteList extends React.Component {


    onOpenEdit = (noteId) => {
        this.props.history.push('/note/' + noteId)
    }

    render() {
        const { notes } = this.props
        const { onOpenEdit } = this
        if (!notes) return <h1>loading</h1>
        return (
            <section className="notes-container">
                {notes.map((note) => {
                    return (
                        <article className="note" key={note.id}>
                            <NotePreview note={note} />
                            <section className="button-list">
                                <button onClick={() => onOpenEdit(note.id)}>Edit</button>
                            </section>
                        </article>

                    )
                })}
            </section>
        )
    }
}

export const NoteList = withRouter(_NoteList)