import { eventBusService } from "../../../services/event-bus.service.js";
import { utilService } from "../../../services/util.service.js";
import { noteService } from "../services/note.service.js";
import { NoteButtons } from "./note-buttons.jsx";


export class NoteDetails extends React.Component {


    render() {
        const { onRemoveNote, onPinNote, onChangeNoteColor, note,
            onEditText, onSaveChanges, onDuplicate, onEditCheckBox } = this.props
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

                        <_NoteContent onEditCheckBox={onEditCheckBox} note={note} onEditText={onEditText} />
                    </form>
                    <section className="edit-note-btns-container">
                        <button onClick={onSaveChanges}>
                            <i className="fa-solid fa-xmark"></i>
                            </button>
                        <NoteButtons onDuplicate={onDuplicate} onChangeNoteColor={onChangeNoteColor} onRemoveNote={onRemoveNote}
                            onPinNote={onPinNote} noteId={note.id} />
                    </section>

                </article>
            </React.Fragment>

        )
    }
}

function _NoteContent({ note, onEditText, onEditCheckBox }) {
    switch (note.type) {
        case ('note-txt'):
            return (
                <textarea
                    type="text"
                    name="txt"
                    value={note.info.txt}
                    onChange={onEditText}
                />
            )
        case ('note-img'):
            return (
                <img src={note.info.imgUrl}>

                </img>
            )
        case ('note-video'):
            return (
                <iframe src={note.info.videoLink}>

                </iframe>
            )
        case ('note-todos'):
            return (
                <ul className="todo-list">
                    {note.info.todos.map((todo, index) => {
                        return (
                            <li key={utilService.makeId()}>
                                <input
                                    id={`todo-${index}-${note.id}`}
                                    className="todo-check"
                                    type="checkbox"
                                    checked={(todo.doneAt) ? true : false}
                                    onChange={() => { onEditCheckBox(index) }}
                                />
                                <label className="todo-txt" htmlFor={`todo-${index}-${note.id}`}>{todo.txt}</label>
                            </li>
                        )
                    })}
                </ul>
            )

    }

}