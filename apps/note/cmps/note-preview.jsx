
export class NotePreview extends React.Component {

    state = {
        note: null
    }
    componentDidMount() {
        this.setState({ note: this.props.note })
    }


    DynamicCmp = (note) => {
        switch (this.state.note.type) {
            case ('note-txt'):
                return TxtNote(note)
        }
    }

    render() {
        const { note } = this.state
        const { DynamicCmp } = this
        if (!note) return <h1>loading</h1>
        return (
            <DynamicCmp note={note} />
        )
    }
}

function TxtNote({ note }) {
    return (
        <div>
            <h3>{note.info.title}</h3>
            <p>{note.info.txt}</p>
        </div>
    )
}


