import { eventBusService } from "../../../services/event-bus.service.js";
import { noteService } from "../services/note.service.js";


export class NoteButtons extends React.Component {

    state = {
        isPinned: false,
        isColorPaletteOpen: false
    }


    componentDidMount() {
        this.checkIsPinned()
    }

    checkIsPinned = () => {
        noteService.isPinned(this.props.noteId)
            .then((isPinned) => this.setState({ isPinned }))
    }

    onChangePinned = () => {
        this.setState({ isPinned: !this.state.isPinned })
        this.props.onPinNote(this.props.noteId)
    }

    toggleColorPalette = () => {
        this.setState({ isColorPaletteOpen: !this.state.isColorPaletteOpen })
    }

    onColorSelect = (color) => {
        const { onChangeNoteColor, noteId } = this.props
        onChangeNoteColor(noteId, color)
        this.setState({ isColorPaletteOpen: false })
    }

    onSendNoteAsEmail = () => {
        const {noteId} = this.props
        eventBusService.emit('note-to-email',noteId)
    }
    render() {
        const { noteId, onRemoveNote } = this.props
        const { isPinned, isColorPaletteOpen } = this.state
        const { onChangePinned, toggleColorPalette, onColorSelect,onSendNoteAsEmail } = this
        const labelClassName = (isPinned) ? 'pinned' : 'unpinned'
        return (

            <React.Fragment>
                <button onClick={onSendNoteAsEmail}>
                    Send as Email
                </button>
                <button onClick={() => { onRemoveNote(noteId) }}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
                <button onClick={toggleColorPalette}>
                    <i className="fa-solid fa-palette"></i>
                </button>
                <label className={"pin-box-label " + labelClassName} htmlFor={"pin-box-" + noteId}>
                    <i className="fa-solid fa-thumbtack"></i>
                </label>
                {isColorPaletteOpen && <div className="color-btns-container">
                    <button className="color-btn lightcoral" onClick={() => { onColorSelect('lightcoral') }}></button>
                    <button className="color-btn plum" onClick={() => { onColorSelect('plum') }}></button>
                    <button className="color-btn lightgreen" onClick={() => { onColorSelect('lightgreen') }}></button>
                    <button className="color-btn slateblue" onClick={() => { onColorSelect('slateblue') }}></button>
                    <button className="color-btn lightskyblue" onClick={() => { onColorSelect('lightskyblue') }}></button>
                    <button className="color-btn peru" onClick={() => { onColorSelect('peru') }}></button>

                </div>}
                <input type="checkbox"
                    id={"pin-box-" + noteId}
                    name="pin-box"
                    checked={isPinned}
                    onChange={onChangePinned}


                />
            </React.Fragment>
        )
    }

}
