const express = require('express')
const app = express()

app.use(express.json())

let directory = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
  ]

app.get('/', (request, response) => {
    response.send('<h1>Phone Directory </h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(directory)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    note ? response.json(note) : response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

const generateID = () => {
    const maxID = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
    return String(maxID + 1)
}

app.post('/api/notes', (request, response) => {

    const body = request.body
    
    if (!body.content){
        return response.status(400).json({
            error: 'content is missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateID()
    }

    notes = notes.concat(note)

    response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

