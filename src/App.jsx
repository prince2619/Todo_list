import { useEffect, useState } from "react";

import { TodoProvider } from "./context/Context";
import TodoForm from "./component/TodoForm";
import TodoItem from "./component/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev , {id: Date.now(), ...todo}])
  }

  const updateTodo = (id, todo) =>{
    setTodos((prev) => prev.map((item) => (item.id === id ? todo: prevTodo)))
  }

  const deleteTodo = (id) =>{
    setTodos((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((item) => item.id === id ? {...item, complete: !item.complete}: item))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0) setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}>
    <div className=" min-h-screen py-8">
      <div className="w-full max-w-2xl px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>
        <div className="mb-4"><TodoForm/></div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className="w-full">
              <TodoItem todo={todo}/>
            </div>
          ))}
        </div>
      </div>
    </div>
    </TodoProvider>
  );
}

export default App;
