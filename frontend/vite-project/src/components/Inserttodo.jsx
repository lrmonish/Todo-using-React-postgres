import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Inserttodo.css'; // Assuming the CSS file exists

export const Inserttodo = () => {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);
  const [val, setVal] = useState('');
  const [count, setcount] = useState(0);

  let data = [];


const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getdata');
      data = response.data;
      setTodos(data);
   

    } catch (error) {
      console.error('Error fetching todos:', error); // Handle errors
    }
  };

  const createTodo = async (newTodo) => {
    try {
        console.log("newtodo",newTodo);
      const response = await axios.post('http://localhost:5000/data', newTodo);
     
    } catch (error) {
      console.error('Error creating todo:', error); // Handle errors
    }
  };

  

  useEffect(()=>{
    fetchTodos();
    
  },[count])


  // Function to add a new todo
  const addTodo = (text) => {
    fetchTodos();
    createTodo({
        id: Math.random(), 
        text,
        completed: false,
      })
  
    // setTodos();
  };


  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteUser/${id}`);
     
    } catch (error) {
      console.error('Error deleting todo:', error); // Handle errors
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
        const obj = {
            text:updatedTodo,
            completed:false
        }

        console.log("hiii",obj);
      const response = await axios.put(`http://localhost:5000/updateUser/${id}`, obj);
      
    } catch (error) {
      console.error('Error updating todo:', error); // Handle errors
    }
  };
  


  // Function to toggle the completion status of a todo
  const toggleTodo = (idn) => {
    console.log(todos);
    setTodos(
      todos.map((todo) =>
        todo.idn === idn ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to remove a todo
  const removeTodo = (idn) => {
    setTodos(todos.filter((todo) => todo.idn !== idn));
  };

  return (
    <div className="insApp">
      <h1>Todo List</h1>

      <form onSubmit={(e) => (e.preventDefault(), addTodo(val), setcount(count+1), e.reset )}>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Submit</button>
      </form>

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.idn}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.idn)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            
            <button onClick={() => ( updateTodo(todo.idn, val),setcount(count+1)) }>Update</button>
            <button onClick={() => (deleteTodo(todo.idn),setcount(count+1))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
