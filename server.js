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

app.get('/api/notes', (req, res) => res.json(database.getAPI()))
app.post('/api/notes', (req, res) => {
    const note = req.body
    database.saveNote(note)
    res.send()
})
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    database.deleteNode(id)
    res.send()
})

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})