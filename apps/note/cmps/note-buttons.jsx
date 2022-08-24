import { noteService } from "../services/note.service.js";


export class NoteButtons extends React.Component {

    state = {
        isPinned: false
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
    render() {
        const { noteId, onRemoveNote } = this.props
        const { isPinned } = this.state
        const { onChangePinned } = this

        return (

            <React.Fragment>
                <button onClick={() => { onRemoveNote(noteId) }}>delete</button>
                <button>change color</button>
                <input type="checkbox"
                    checked={isPinned}
                    onChange={onChangePinned}


                />
            </React.Fragment>
        )
    }

}
