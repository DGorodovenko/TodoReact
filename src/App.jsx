import { useState } from 'react'

function App() {

  //setup empty array
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState([])

  function addTodo() {
    if (input.trim() == '') return 
    setTodos([...todos, input])
    setInput('')
  }

  function deleteTodo(index) {
    setTodos(todos.filter((_, i) => i != index))
  }

  return (
    <div>
      <h1>Todo App</h1>

      <input 
        type="text"
        value = {input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if(e.altKey && e.key == 'Enter') addTodo()
        }}
        placeholder="Add a new todo ..."
      />
      <button onClick={addTodo}>Add</button>

      <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}
        <button onClick={() => deleteTodo(index)}>Delete</button></li>
      ))}
    </ul>
    </div>

    
  )
}

export default App