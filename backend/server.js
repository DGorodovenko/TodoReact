const express = require('express')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = new sqlite3.Database('todos.db')

db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL
)`)

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001')
})

app.get('/todos', (req, res) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
        res.json(rows)
    })
})

app.post('/todos', (req, res) => {
  const { text } = req.body
  db.run('INSERT INTO todos (text) VALUES (?)', [text], function() {
    res.json({ id: this.lastID, text })
  })
})

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM todos WHERE id = ?', [id], () => {
    res.json({ deleted: id })
  })
})