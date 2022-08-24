import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"



export const noteService = {
    getNotes,
    createNote
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

function createNote(type, content) {
    let newNote 
    switch (type) {
        case('txt'):
        newNote= _createTxtNote(content)
        
    }
    const notes = _loadNotesFromStorage()
    notes.unshift(newNote)
    _saveNotesToStorage(notes)
}

function _createTxtNote(content){
    return {
        id:utilService.makeId(),
        type:'note-txt',
        isPinned:false,
        info:{
            txt: content
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
