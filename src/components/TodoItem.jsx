// src/components/TodoItem.js
import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onSetReminder }) => {
  const [reminderTime, setReminderTime] = useState('');

  const handleReminderChange = (e) => {
    setReminderTime(e.target.value);
  };

  const handleSetReminder = () => {
    const reminderDate = new Date(reminderTime);
    if (reminderDate > new Date()) {
      onSetReminder(todo.id, reminderDate);
    } else {
      alert('Please select a future date and time.');
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <input
        type="datetime-local"
        value={reminderTime}
        onChange={handleReminderChange}
      />
      <button className="set-reminder" onClick={handleSetReminder}>Set Reminder</button>
      <button className="delete" onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
