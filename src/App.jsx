import { useEffect } from 'react';
import './App.css'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';

const supabase = createClient(
  "https://ebwmbdlhrlbbmdkhcomc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVid21iZGxocmxiYm1ka2hjb21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzOTAyOTMsImV4cCI6MjA3Mzk2NjI5M30.gM_PBbpGrjvZJr2g3W4VrmSQlAD-Bv1s-OQERiXD3Ys"
);

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")

  async function updateTodo(todo) {
    await supabase.from('todos').update({done:!todo.done}).eq('id',todo.id)
    await getTodos()
  }
  
  async function createTodo() {
    await supabase.from('todos').insert({title:text})
    await getTodos()
  }

  async function getTodos() {
    const{data}=await supabase.from('todos').select().order('id')
    setTodos(data)
  }
  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <input
        value={text}
        placeholder="Insert the title"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={createTodo}>Add</button>
      {todos.map((todo) => (
        <p key={todo.id}>
          <input type="checkbox" checked={todo.done} onChange={()=>updateTodo(todo)} />
          {todo.title}</p>
      ))}
    </>
  );
} 

export default App
