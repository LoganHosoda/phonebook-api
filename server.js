const express = require('express');
const app = express();
const PORT = 3001;
app.use(express.json())

let persons = [
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

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);
  if (person) res.json(person);
  else res.status(404).end();
});

app.get('/info', (req, res) => {
  const peopleCount = persons.length;
  const date = new Date();
  res.send(`<h3>Phonebook has info for ${peopleCount} people <br>${date}`);
});

app.post('/api/persons', (req, res) => {
  const id = Math.round(Math.random() * 1000000).toString();
  const body = req.body;
  const names = persons.map(p => p.name);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "must contain only name and number keys"   
    })
  } else if (names.includes(body.name)) {
    return res.status(400).json({
      error: "name must be unique"
    });
  }

  const person = {
    id: id,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person);
  res.send(persons);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(p => p.id !== id);
  res.send(persons);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
