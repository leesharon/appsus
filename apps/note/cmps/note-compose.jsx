import { noteService } from "../services/note.service.js";

export class NoteCompose extends React.Component {

    state = {
        info: {
            txt: '',
            title: '',
            videoLink: '',
            imgUrl: '',
            todos: ['']
        },
        type: 'txt'
    }



    onHandleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ info: { ...prevState.info, [name]: value } }))
    }

    onTypeChange = (type) => {
        this.setState({ type })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { info, type } = this.state
        const newNotePrm = noteService.createNote(type, info)
        this.props.onNewNote(newNotePrm)
        this.setState({ info: { txt: '', title: '' } })
    }

    onUploadImage = (ev) => {
        let reader = new FileReader()
        reader.onload = (event) => {
            this.setState((prevState) => ({ info: { ...prevState.info, imgUrl: event.target.result } }))
        }
        reader.readAsDataURL(ev.target.files[0])

    }

    onNewInput = ({ target: { value, name } }) => {
        const { info: { todos } } = this.state
        todos[name.charAt(name.length - 1)] = value
        if (+name.charAt(name.length - 1) + 1 === todos.length) todos.push('') // if use has done an input on the last line im giving him a new line automaticaly
        this.setState((prevState) => ({ info: { ...prevState.info, todos } }))

    }

    render() {
        const { info, type } = this.state
        const { title, txt, videoLink } = info
        const { onHandleChange, onSubmit, onTypeChange } = this

        return (
            <section className="note-compose" >
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={onHandleChange}
                        placeholder="Note title"
                    />
                    <ContentInput father={this} />
                </form>
                <section className="change-type-btns-container">
                    <button onClick={onSubmit}>
                        <i className="fa-solid fa-file-arrow-up"></i>
                    </button>
                    <button onClick={() => { onTypeChange('img') }}>
                        <i className="fa-solid fa-image"></i>
                    </button>
                    <button onClick={() => { onTypeChange('todos') }}>
                        <i className="fa-solid fa-list-check"></i>
                    </button>
                    <button onClick={() => { onTypeChange('video') }}>
                        <i className="fa-brands fa-youtube"></i>
                    </button>
                    <button onClick={() => { onTypeChange('txt') }}>
                        T
                    </button>
                </section>
            </section>
        )
    }
}

function ContentInput({ father: { state, onHandleChange, onUploadImage, onNewInput } }) {
    switch (state.type) {
        case ('txt'):
            return (
                <textarea
                    width="70%"
                    type="text"
                    name='txt'
                    value={state.info.txt}
                    onChange={onHandleChange}
                    placeholder="Whats on your mind?"
                />
            )
        case ('video'):
            return (
                <textarea
                    width="70%"
                    type="text"
                    name='videoLink'
                    value={state.info.videoLink}
                    onChange={onHandleChange}
                    placeholder="Enter Youtube url"
                />
            )
        case ('img'):
            return (
                <React.Fragment>
                    <input
                        type="file"
                        onChange={onUploadImage}
                    />
                    <img src={state.info.imgUrl} />
                </React.Fragment>


            )
        case ('todos'):
            return (
                <CreateTodoInputs todos={state.info.todos} onNewInput={onNewInput} />
            )


    }
}

function CreateTodoInputs({ todos, onNewInput }) {
    return todos.map((todo, index) => {

        return <input
            key={'todo' + index}
            value={todo}
            name={'todo' + index}
            onChange={onNewInput}
        />
    })
}