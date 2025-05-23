const express = require('express')
const app = express()
let morgan = require('morgan')

const now = new Date();

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

  morgan.token('message', function (req, res) { return JSON.stringify(req.body)})

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.method(req, res) === "POST" ? tokens.message(req, res) : ''
    ].join(' ')
  }))

// const post = (tokens, req, res) => {
// return (
//     [
//         tokens.method(req, res),
//         tokens.url(req, res),
//         tokens.status(req, res),
//         tokens.res(req, res, 'content-length'), '-',
//         tokens['response-time'](req, res), 'ms'

//     ]
// )
// }


app.get('/', (request, response) => {
    response.send('<h1>Phone Directory </h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(directory)
})

app.get('/info', (request, response) => {
    const size = directory.length
    response.send(`<p>Phonebook has info for ${size} people </p><p>${now}</p>`)
    response.send()
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const contact = directory.find(dir => dir.id === id)
    contact ? response.json(contact) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    directory = directory.filter(dir => dir.id !== id)
    response.status(204).end()
})


const generateID = () => {
    const ID = Math.floor(Math.random() * 1000)
    return ID
    // const maxID = notes.length > 0
    // ? Math.max(...notes.map(n => Number(n.id)))
    // : 0
    // return String(maxID + 1)
}

app.post('/api/persons', (request, response) => {

    const body = request.body
    
    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'some info is missing'
        })
    }

    const identical = directory.find(contact => contact.name === body.name)
    if (identical) {return response.status(400).json({
        error: 'name must be unique'
    })} 
    

    const contact = {
        id: generateID(),
        name: body.name,
        number: body.number
    }

    directory = directory.concat(contact)

    response.json(contact)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

