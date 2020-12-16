const express = require('express')
const path = require('path')
const database = require('./lib/database')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get('/api/notes', (req, res) => {
    res.json(database.getAPI())
})
app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    res.json(database.getNote(id))
})

app.post('create-note', data => database.createNote(...data))
app.post('edit-note', data => database.editNote(...data))
app.post('delete-note', data => database.deleteNode(...data))

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})