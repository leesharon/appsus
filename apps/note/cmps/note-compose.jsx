import { noteService } from "../services/note.service.js";

export class NoteCompose extends React.Component {

    state = {
        info: {
            txt: '',
            title: ''
        },
        type: 'txt'
    }



    onHandleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ info: { ...prevState.info, [name]: value } }))
    }

    onSubmit = () => {
        const { info, type } = this.state
        const newNotePrm = noteService.createNote(type, info)
        this.props.onNewNote(newNotePrm)
        this.setState({ info: { txt: '', title: '' } })
    }
    render() {
        const { info, type } = this.state
        const { title, txt } = info
        const { onHandleChange, onSubmit } = this
        return (
            <section>

                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onHandleChange}
                    placeholder="Note title"
                />
                <input
                    type="text"
                    name="txt"
                    value={txt}
                    onChange={onHandleChange}
                    placeholder="Whats on your mind?"
                />
                <button onClick={onSubmit}>save!</button>
                <button>img</button>
                <button>todos</button>
                <button>video</button>
                <button>text</button>
            </section>
        )
    }
}