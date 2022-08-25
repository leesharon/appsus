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

    onSubmit = (ev) => {
        ev.preventDefault()
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
            <section className="note-compose">
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={onHandleChange}
                        placeholder="Note title"
                    />
                    <textarea
                    width="70%"
                        type="text"
                        name="txt"
                        value={txt}
                        onChange={onHandleChange}
                        placeholder="Whats on your mind?"
                    />
                </form>
                <section className="change-type-btns-container">
                    <button onClick={onSubmit}>
                        <i className="fa-solid fa-file-arrow-up"></i>
                    </button>
                    <button >
                        <i className="fa-solid fa-image"></i>
                    </button>
                    <button>
                        <i className="fa-solid fa-list-check"></i>
                    </button>

                    <button>
                        <i className="fa-brands fa-youtube"></i>
                    </button>
                    <button>
                        T
                    </button>
                </section>

            </section>
        )
    }
}