const fs = require('fs')

class Database {
    #path
    #notes

    constructor() {
        this.#path = './lib/db.json'
        this.#notes = JSON.parse(fs.readFileSync(this.#path))
    }
    
    #save = function() {
        fs.writeFileSync(this.#path, JSON.stringify(this.#notes))
    }

    #generateID = function() {
        const ids = this.#notes.map(note => note.id)

        let id
        do id = Math.floor(Math.random() * 36**9).toString(36).toUpperCase().padStart(9, '0')
        while (ids.includes(id))
        
        return id
    }
    
    getAPI() {
        return [...this.#notes]
    }

    saveNote(note) {
        note.id = this.#generateID()
        this.#notes.push(note)
        this.#save()
        return note
    }

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
        this.#save()
        return removed
    }
}

module.exports = new Database()