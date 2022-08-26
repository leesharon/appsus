import { eventBusService } from "../../../services/event-bus.service.js";
import { NoteCompose } from "../cmps/note-compose.jsx";
import { NoteDetails } from "../cmps/note-details.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { NoteSearch } from "../cmps/note-search.jsx";
import { noteService } from "../services/note.service.js";



const Router = ReactRouterDOM.HashRouter
const { Route } = ReactRouterDOM
export class NoteIndex extends React.Component {

    state = {
        notes: null,
        chosenNote: null,
        filterBy: {
            'note-video': false,
            'note-img': false,
            'note-todos': false,
            'note-txt': false,
            searchBy: ''

        }
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
        noteService.getNotes(this.state.filterBy)
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

    onDuplicate = (noteId) => {
        noteService.duplicateNote(noteId)
            .then((newNote) => {
                const notes = this.state.notes
                notes.unshift(newNote)
                this.setState({ notes: [...notes] })
            })
    }

    onFilterBy = (filterBy) => {
        this.setState({
            filterBy: {
                ...this.state.filterBy,
                [filterBy]: !this.state.filterBy[filterBy]
            }
        },
            this.loadNotes)
    }

    onMarkDone = (noteId, todoIndex) => {
        noteService.changeIsDone(noteId, todoIndex)
            .then((refactoredNote) => {
                let notes = this.state.notes
                notes = notes.map((note) => (note.id === noteId) ? refactoredNote : note)
                this.setState({ notes })

            })
    }

    onEditCheckBox = (todoIndex) => {
        const note = this.state.chosenNote
        if (!note.info.todos[todoIndex].doneAt) {
            note.info.todos[todoIndex].doneAt = new Date()
        } else {
            note.info.todos[todoIndex].doneAt = null
        }

        this.setState({ chosenNote: { ...note } })
    }

    onSearchNotes = (value) => {
        this.setState({
            filterBy: {
                ...this.state.filterBy,
                searchBy: value
            }
        },
            this.loadNotes)
    }


    render() {
        const { notes, chosenNote, filterBy } = this.state
        if (!notes) return <h1>loading from index</h1>
        const { onNewNote, onEditNote, onChoseNote, onSaveChanges,
            onRemoveNote, onPinNote, onChangeNoteColor, onEditText,
            onEditColor, onEditPin, onDuplicate, onFilterBy, onMarkDone,
            onEditCheckBox, onSearchNotes } = this
        const pinnedNotes = notes.filter((note) => note.isPinned)
        const unPinnedNotes = notes.filter((note) => !note.isPinned)

        return (
            <main className="main-note-app full">
                {chosenNote && <NoteDetails onEditCheckBox={onEditCheckBox} onDuplicate={onDuplicate} onSaveChanges={onSaveChanges} onEditText={onEditText}
                    note={chosenNote} onEditNote={onEditNote} onPinNote={onEditPin}
                    onChangeNoteColor={onEditColor} onRemoveNote={onRemoveNote} />}
                <NoteSearch onSearchNotes={onSearchNotes} />
                <NoteCompose onNewNote={onNewNote} />
                <section className="notes-and-filter">
                    <NoteFilter filterBy={filterBy} onFilterBy={onFilterBy} />

                    <div>
                        {pinnedNotes.length > 0 && <NoteList onMarkDone={onMarkDone} onDuplicate={onDuplicate} notes={pinnedNotes} onChangeNoteColor={onChangeNoteColor}
                            onChoseNote={onChoseNote} onPinNote={onPinNote} onRemoveNote={onRemoveNote} />}

                        {unPinnedNotes.length > 0 && <NoteList onMarkDone={onMarkDone} onDuplicate={onDuplicate} notes={unPinnedNotes} onChangeNoteColor={onChangeNoteColor}
                            onChoseNote={onChoseNote} onPinNote={onPinNote} onRemoveNote={onRemoveNote} />}
                    </div>

                </section>
            </main>
        )
    }
}
