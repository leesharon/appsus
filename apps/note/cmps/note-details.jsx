import { eventBusService } from "../../../services/event-bus.service.js";
import { noteService } from "../services/note.service.js";


export class NoteDetails extends React.Component {

    state = {
        note: null,
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.loadNote()
        console.log(this.inputRef)
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
        const newNotePrm =  noteService.EditNote(this.state.note)
        // send to main to update his side aswell 
    }


    loadNote = () => {
        const { noteId } = this.props.match.params
        noteService.getById(noteId)
            .then((note) => {
                if (!note) this.props.history.push('/note')
                this.setState({ note })
            })
    }

    render() {
        const { note } = this.state
        if (!note) return
        const { onHandleChange } = this
        const { title, txt } = note.info
        console.log(this.props)
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
                <button onClick="">Save changes</button>
            </article>
        )
    }
}