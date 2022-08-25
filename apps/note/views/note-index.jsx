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
        eventBusService.on('mail-to-note', (mail) => {
            noteService.createNote('txt', mail)
                .then((newNote) => {
                    this.setState({ notes: [newNote, ...this.state.notes] })
                })
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

    onEditNote = (newNote) => {
        noteService.EditNote(newNote)
            .then((newNoteFromService) => {
                const notes = this.state.notes
                const newNotes = notes.map((note) => (note.id === newNoteFromService.id) ? newNoteFromService : note)
                this.setState({ notes: newNotes, chosenNote: null })
            })
    }

    onChoseNote = (note) => {
        this.setState({ chosenNote: note })
    }

    onRemoveNote = (noteId) => {
        noteService.removeNote(noteId)
            .then(() => {
                let notes = this.state.notes
                notes = notes.filter(note => noteId !== note.id)
                this.setState({ notes })
            }
            )

    }

    onEditText = ({ target }) => {
        const { name, value } = target
        this.setState((prevState) => ({
            chosenNote: {
                ...prevState.chosenNote,
                info: { ...prevState.chosenNote.info, [name]: value }
            }
        }))
    }

    onEditColor = (noteId, color) => {
        this.setState((prevState) => ({
            chosenNote: {
                ...prevState.chosenNote,
                style: { backgroundColor: color }
            }
        }))
    }

    onEditPin = (noteId) => {
        this.setState((prevState) =>
        ({
            chosenNote:
            {
                ...prevState.chosenNote,
                isPinned: !prevState.chosenNote.isPinned
            }
        }))
    }

    onSaveChanges = () => {
        const newNote = this.state.chosenNote
        this.onEditNote(newNote)
        this.setState({ chosenNote: null })
    }



    onPinNote = (noteId) => {
        noteService.pinNote(noteId).then(() => {
            let notes = this.state.notes
            notes.forEach(note => { if (note.id === noteId) note.isPinned = !note.isPinned })
            this.setState({ notes: [...notes] })
        }
        )
    }

    onChangeNoteColor = (noteId, color) => {
        noteService.ChangeNoteColor(noteId, color)
            .then(() => {
                let notes = this.state.notes
                notes.forEach(note => { if (note.id === noteId) note.style.backgroundColor = color })
                this.setState({ notes: [...notes] })
            }
            )
    }

    // onSendAsMail = () => {
    //     noteService.getById()
    // }


    render() {
        const { notes, chosenNote } = this.state
        if (!notes) return <h1>loading from index</h1>
        const { onNewNote, onEditNote, onChoseNote, onSaveChanges, onRemoveNote,
            onPinNote, onChangeNoteColor, onEditText, onEditColor, onEditPin } = this
        const pinnedNotes = notes.filter((note) => note.isPinned)
        const unPinnedNotes = notes.filter((note) => !note.isPinned)

        return (
            <main className="main-note-app full">
                {chosenNote && <NoteDetails onSaveChanges={onSaveChanges} onEditText={onEditText}
                    note={chosenNote} onEditNote={onEditNote} onPinNote={onEditPin}
                    onChangeNoteColor={onEditColor} onRemoveNote={onRemoveNote} />}

                <NoteCompose onNewNote={onNewNote} />

                {pinnedNotes.length > 0 && <NoteList notes={pinnedNotes} onChangeNoteColor={onChangeNoteColor}
                    onChoseNote={onChoseNote} onPinNote={onPinNote} onRemoveNote={onRemoveNote} />}

                {unPinnedNotes.length > 0 && <NoteList notes={unPinnedNotes} onChangeNoteColor={onChangeNoteColor}
                    onChoseNote={onChoseNote} onPinNote={onPinNote} onRemoveNote={onRemoveNote} />}
            </main>
        )
    }
}
