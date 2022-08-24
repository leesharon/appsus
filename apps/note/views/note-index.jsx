import { eventBusService } from "../../../services/event-bus.service.js";
import { NoteCompose } from "../cmps/note-compose.jsx";
import { NoteDetails } from "../cmps/note-details.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { noteService } from "../services/note.service.js";



const Router = ReactRouterDOM.HashRouter
const { Route } = ReactRouterDOM
export class NoteIndex extends React.Component {

    state = {
        notes: null
    }

    componentDidMount() {
        this.loadNotes()
        eventBusService.on('edit-note', (editedNote) => {
            const noteId = editedNote.id
            const notes = this.state.notes
            const noteIdx = notes.findIndex(note => noteId === note.id)
            notes.splice(noteIdx, 1, editedNote)
            console.log('got activated', notes)
            this.setState({ notes:[...notes]})
        })
    }

    loadNotes = () => {
        noteService.getNotes()
            .then((notes) => this.setState({ notes }))
    }

    onNewNote = (newNotePrm) => {
        newNotePrm.then((newNote) => {
            this.setState({ notes: [newNote, ...this.state.notes] })
        })
    }

    // onEditNote = (newNotePrm) => {
    //     newNotePrm
    //         .then((note) => {
    //             const notes = this.state.notes
    //             const noteId = note.id
    //             const noteIdx = notes.findIndex(note => noteId === note.id)
    //             notes.splice(noteIdx, 1, newNote)
    //             this.setState({ notes })
    //         })
    // }

    render() {
        const { notes } = this.state
        const { onNewNote } = this
        if (!notes) return <h1>loading from index</h1>
        return (
            <Router>

                <main>
                    <Route path="/note/:noteId" component={NoteDetails} />
                    <NoteCompose onNewNote={onNewNote} />
                    <NoteList notes={notes} />
                </main>
            </Router>
        )
    }
}
