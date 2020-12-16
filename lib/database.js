const fs = require('fs')

class Database {
    #path
    #notes

    constructor() {
        this.#path = './lib/db.json'
        this.#notes = JSON.parse(fs.readFileSync(this.#path))
    }
    
    /**
     * Save the note to memory.
     */
    #save = function() {
        fs.writeFileSync(this.#path, JSON.stringify(this.#notes))
    }

    /**
     * Generate a unique id.
     */
    #generateID = function() {
        const ids = this.#notes.map(note => note.id)

        let id
        do id = Math.floor(Math.random() * 36**9).toString(36).toUpperCase().padStart(9, '0')
        while (ids.includes(id))
        
        return id
    }

    /**
     * Get the list of notes in JSON format.
     */
    getAPI() {
        return [...this.#notes]
    }

    /**
     * Get a note using it's id.
     * @param {string} id The id of the note being looked up.
     */
    getNote(id) {
        for (const note of this.#notes) {
            if (note.id == id) {
                console.log('Looked up a note.', note)
                return {...note}
            }
        }
        console.error('Could note get note.', id)
        return null
    }

    /**
     * Create a new note and save it into memory.
     * @param {string} title The title of the note being created.
     * @param {string} text The text of the note being created.
     * @returns the note being created.
     */
    createNote(title, text) {
        const note = {
            id: this.#generateID(),
            title,
            text
        }
        this.#notes.push(note)
        console.log('Created a note.', note)
        this.#save()
        return note
    }

    /**
     * Edit a note that already exists.
     * @param {string} id The id of the note being edited.
     * @param {string} title The title of the note being edited.
     * @param {string} text The text of the note being edited.
     * @returns the note that was just edited.
     */
    editNote(id, title, text) {
        for (const note of this.#notes) {
            if (note.id == id) {
                note.title = title
                note.text = text
                console.log('Edited a note.', note)
                this.#save()
                return note
            }
        }
        console.error('Could note edit note.', id)
        return null
    }

    /**
     * Delete a note from memory.
     * @param {string} id The id of the note being deleted.
     * @returns the note that was just deleted.
     */
    deleteNode(id) {
        const list = []
        let removed = null
        for (const note of this.#notes) {
            if (note.id != id) {
                list.push(note)
            } else {
                removed = note
            }
        }
        this.#notes = list
        removed ? console.log('Deleted a note.', removed) : console.error('Could note delete note.', id)
        this.#save()
        return removed
    }
}

module.exports = new Database()