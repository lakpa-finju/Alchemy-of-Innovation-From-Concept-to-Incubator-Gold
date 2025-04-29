import React from 'react';

function TodoStats({ todos, clearCompleted }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const remainingTodos = totalTodos - completedTodos;

  return (
    <div className="status-bar">
      <span>{remainingTodos} items left</span>
      {completedTodos > 0 && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}

export default TodoStats;