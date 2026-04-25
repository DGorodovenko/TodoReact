import { useState, useEffect } from 'react'

function App() {

  //setup empty array
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState([])


  useEffect(() => {
  fetch('http://localhost:3001/todos')
    .then((res) => res.json())
    .then((data) => setTodos(data))
  }, [])

  function addTodo() {
  if (input.trim() === '') return
  fetch('http://localhost:3001/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: input })
  })
    .then((res) => res.json())
    .then((newTodo) => {
      setTodos([...todos, newTodo])
      setInput('')
    })
  }

  function deleteTodo(id) {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id))
    })
  }

  return (
    <div>
      <h1>Todo App</h1>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.altKey && e.key === 'Enter') addTodo()
          }}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>

    
  )
}

export default App