import { eventBusService } from "../../../services/event-bus.service.js";
import { NoteCompose } from "../cmps/note-compose.jsx";
import { NoteDetails } from "../cmps/note-details.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { noteService } from "../services/note.service.js";



const Router = ReactRouterDOM.HashRouter
const { Route } = ReactRouterDOM
export class NoteIndex extends React.Component {

    state = {
        notes: null,
        chosenNote: null
    }

    componentDidMount() {
        this.loadNotes()
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

    onEditNote = (newNote) => {
        noteService.EditNote(newNote)
            .then(this.loadNotes())
        // noteService.EditNote(newNote)
        //     .then((newNoteFromService) => {
        //         const notes = this.state.notes
        //         const newNotes = notes.map((note) => (note.id === newNoteFromService.id) ? newNoteFromService : note)
        //         this.setState({ notes: newNotes })
        //     })
    }

    onChoseNote = (note) => {
        this.setState({ chosenNote: note })
    }

    onRemoveNote = (noteId) => {
        noteService.removeNote(noteId)
            .then(() => {
                let notes = this.state.notes
                notes = notes.filter(note => noteId !== note.id)
                this.setState({ notes }, () => { console.log(this.state.notes) })
            }
            )

    }

    onPinNote = (noteId) => {
        noteService.pinNote(noteId).then(() => {
            let notes = this.state.notes
            notes.forEach(note => { if (note.id === noteId) note.isPinned = !note.isPinned })
            this.setState({ notes: [...notes] })
        }
        )
    }



    render() {
        const { notes, chosenNote } = this.state
        if (!notes) return <h1>loading from index</h1>
        const { onNewNote, onEditNote, onChoseNote, onRemoveNote, onPinNote } = this
        const pinnedNotes = notes.filter((note) => note.isPinned)
        const unPinnedNotes = notes.filter((note) => !note.isPinned)
        console.log(pinnedNotes, unPinnedNotes)

        return (
            <main className="full">
                {chosenNote && <NoteDetails noteId={chosenNote.id} onEditNote={onEditNote} />}
                <NoteCompose onNewNote={onNewNote} />
                <NoteList notes={pinnedNotes} onChoseNote={onChoseNote} onPinNote={onPinNote} onRemoveNote={onRemoveNote} />
                <NoteList notes={unPinnedNotes} onChoseNote={onChoseNote} onPinNote={onPinNote} onRemoveNote={onRemoveNote} />
            </main>
        )
    }
}
