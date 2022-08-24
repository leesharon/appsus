import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"



export const noteService = {
    getNotes,
    createNote,
    getById,
    EditNote
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


function EditNote(newNote){
    const notes = _loadNotesFromStorage()
    const noteId = newNote.id
    const noteIdx = notes.findIndex(note => noteId === note.id)
    notes.splice(noteIdx,1,newNote)
    _saveNotesToStorage(notes)
    return Promise.resolve(newNote)

}
function getById(noteId) {
    if (!noteId) return Promise.resolve(null)
    const notes = _loadNotesFromStorage()
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note)
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

function _createTxtNote({ title, txt }) {
    return {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            title,
            txt
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
