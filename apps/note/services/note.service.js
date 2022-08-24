import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"



export const noteService = {
    getNotes,
    createNote,
    getById,
    EditNote,
    removeNote,
    isPinned,
    pinNote
}

const notesKEY = 'notesDB'


function getNotes() {
    let notes = _loadNotesFromStorage()
    if (!notes) {
        notes = makeNotes()
        _saveNotesToStorage(notes)
    }
    return Promise.resolve(notes)
}


function EditNote(newNote) {
    let notes = _loadNotesFromStorage()
    notes = notes.map((note) => (note.id === newNote.id) ? newNote : note)
    _saveNotesToStorage(notes)
    return Promise.resolve(newNote)

}
function getById(noteId) {
    if (!noteId) return Promise.resolve(null)
    const notes = _loadNotesFromStorage()
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note)
}
function isPinned(noteId) {
    const notes = _loadNotesFromStorage()
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note.isPinned)

}

function removeNote(noteId) {
    if (!noteId) return Promise.resolve(null)
    let notes = _loadNotesFromStorage()
    notes = notes.filter(note => noteId !== note.id)
    _saveNotesToStorage(notes)
    return Promise.resolve()

}

function createNote(type, content) {
    let newNote
    switch (type) {
        case ('txt'):
            newNote = _createTxtNote(content)

    }
    const notes = _loadNotesFromStorage()
    notes.unshift(newNote)
    _saveNotesToStorage(notes)
    return Promise.resolve(newNote)
}


function pinNote(noteId) {
    console.log('got here')
    const notes = _loadNotesFromStorage()
    notes.forEach(note=>{if (note.id === noteId) note.isPinned = !note.isPinned})
    _saveNotesToStorage(notes)
    console.log(notes)
    return Promise.resolve()
}

function _createTxtNote({ title, txt }) {
    return {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            title,
            txt,
        },
        style: {
            backgroundColor: 'white'
        }
    }
}

function _saveNotesToStorage(notes) {
    storageService.saveToStorage(notesKEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(notesKEY)
}

function makeNotes() {
    return [
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: "Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!"
            }
        },
    ]
}
