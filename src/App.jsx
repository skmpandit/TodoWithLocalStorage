import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if(storedTodos) {
      setTodos(storedTodos);
    }
  },[])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])

  const addTodos = () => {
    if(input.trim()) {
      setTodos([...todos, input]);
      setInput("");
    }
  }

  const ascending = () => {
    const sortedTodos = [...todos].sort((a,b) => a.localeCompare(b));
    console.log(sortedTodos);
    setTodos(sortedTodos);
    setSortOrder("asc");
  }

  const descending = () => {
    const sortedTodos =[...todos].sort((a,b) => b.localeCompare(a));
    setTodos(sortedTodos);
    setSortOrder("desc");
  }

  const deleteTodo = (index) => {
    const newTodo = todos.filter((_,i) => i !== index);
    setTodos(newTodo);
  }

  return (
    <div className='todoApp'>
      <h1>Todo List</h1>
      <input type="text" onChange={(e) => setInput(e.target.value)} value={input} />
      <button onClick={addTodos}>Add</button>
      <div>
        <button onClick={ascending}>Sort Ascending</button>
        <button onClick={descending}>Sort Decending</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo} <button onClick={() => deleteTodo(index)}>Delete</button></li>
        ))}
      </ul>
    </div>
  )
}

export default App
