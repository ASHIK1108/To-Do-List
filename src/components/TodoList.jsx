// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Request notification permission
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      todos.forEach(todo => {
        if (todo.reminder && new Date(todo.reminder) <= new Date()) {
          new Notification('Reminder', { body: todo.text });
          setTodos(todos.map(t => t.id === todo.id ? { ...t, reminder: null } : t));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false, reminder: null },
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const setReminder = (id, reminderDate) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, reminder: reminderDate } : todo
      )
    );
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task"
      />
      <button className="add" onClick={addTodo}>Add</button>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onSetReminder={setReminder}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
