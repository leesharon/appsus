import { NotePreview } from "./note-preview.jsx";
import { noteService } from "../services/note.service.js";


export class NoteList extends React.Component {

    state = {
        notes: []
    }
    componentDidMount() {
        noteService.getNotes()
            .then((notes) => this.setState({ notes }))
    }
    render() {
        const { notes } = this.state
        return (
            <section className="notes-container">
                {notes.map((note) => {
                    return (
                        <article className="note" key={note.id}>
                            <NotePreview note={note} />
                        </article>

                    )
                })}
            </section>
        )
    }
}