import { eventBusService } from "../../../services/event-bus.service.js";
import { noteService } from "../services/note.service.js";


export class NoteDetails extends React.Component {

    state = {
        note: null,
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.loadNote()
        // console.log(this.inputRef)
    }

    onHandleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({
            note: {
                ...prevState.note,
                info: { ...prevState.note.info, [name]: value }
            }
        }))


    }

    onSaveChanges = () => {
        const newNote = this.state.note
        this.props.onEditNote(newNote)
    }


    loadNote = () => {
        const { noteId } = this.props
        noteService.getById(noteId)
            .then((note) => this.setState({ note }))


    }

    render() {
        const { note } = this.state
        if (!note) return
        const { onHandleChange, onSaveChanges } = this
        const { title, txt } = note.info
        return (
            <article>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onHandleChange}
                />
                <input
                    type="text"
                    name="txt"
                    value={txt}
                    onChange={onHandleChange}
                    ref={this.inputRef}
                />
                <button onClick={onSaveChanges}>Save changes</button>
            </article>
        )
    }
}