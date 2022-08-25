import { eventBusService } from "../../../services/event-bus.service.js";
import { noteService } from "../services/note.service.js";
import { NoteButtons } from "./note-buttons.jsx";


export class NoteDetails extends React.Component {


    render() {
        const { onRemoveNote, onPinNote, onChangeNoteColor, note, onEditText, onSaveChanges } = this.props
        const { title, txt } = note.info
        const { backgroundColor } = note.style
        return (
            <React.Fragment>
                <div className="black-screen" onClick={onSaveChanges}>
                </div>
                <article className={"edit-note " + backgroundColor}>
                    <form>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onEditText}
                        />
                        <textarea
                            type="text"
                            name="txt"
                            value={txt}
                            onChange={onEditText}
                        />
                    </form>
                    <section className="edit-note-btns-container">
                        <button onClick={onSaveChanges}>Save changes</button>
                        <NoteButtons onChangeNoteColor={onChangeNoteColor} onRemoveNote={onRemoveNote}
                            onPinNote={onPinNote} noteId={note.id} />
                    </section>

                </article>
            </React.Fragment>

        )
    }
}