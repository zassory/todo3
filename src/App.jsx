//React
import { useEffect, useState } from "react";

//Componentes
import { Title } from "./components/Title";
import { TodoInput } from "./components/TodoInput/TodoInput";
import { TodoList } from "./components/TodoList";

import {
  tareas
} from "../src/data";

function App() {

  const [todos,setTodos] = useState(tareas);

  //El filtro que yo quiero
  const [activeFilter,setActiveFilter] = useState('all');

  //EL todo con el filtro aplicado
  const [filteredTodos,setFilteredTodos] = useState(todos);

  const addTodo = (title) => {
    
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 1;    

    const newTodo = {
      id: lastId + 1,
      title,
      completed: false
    }

    const todoList = [...todos];    
    todoList.push(newTodo);
    setTodos(todoList);
  }

  const handleSetComplete = (id) => {
    const updateList = todos.map(todo => {
      if(todo.id === id){
        return { ...todo, completed: !todo.completed }
      }
      return todo;
    });
    setTodos(updateList);
  }

  const handleClearComplete = () => {
    const updateList = todos.filter(todo => !todo.completed);
    setTodos(updateList);
  }

  const handleDelete = (id) => {
    const updateList = todos.filter(todo => todo.id !== id);
    setTodos(updateList);
  }  

  const showAllTodos = () => {
    setActiveFilter('all');
  }

  const showActiveTodos = () => {
    setActiveFilter('active');
  }

  const showCompletedTodos = () => {
    setActiveFilter('completed');
  }

  useEffect(()=> {
    if(activeFilter === 'all'){
      setFilteredTodos(todos);
    } else if(activeFilter === 'active'){
      const activeTodos = todos.filter(todo => todo.completed === false);
      setFilteredTodos(activeTodos);
    } else if(activeFilter === 'completed'){
      const completedTodos = todos.filter(todo => todo.completed === true);
      setFilteredTodos(completedTodos);
    }
  }, [activeFilter,todos]);

  return (
    <div className="bg-gray-900 min-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-20 px-5">
      <div className="container flex flex-col max-w-xl">
        <Title />
        <TodoInput addTodo = {addTodo}/>
        <TodoList
          todos={ filteredTodos }
          activeFilter  = {  activeFilter  }
          handleSetComplete={ handleSetComplete }
          handleDelete = {  handleDelete  }
          handleClearComplete = { handleClearComplete }
          showAllTodos = { showAllTodos }
          showActiveTodos = { showActiveTodos }
          showCompletedTodos = {  showCompletedTodos  }
        />
      </div>
    </div>
  );
}

export default App;
