document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const clearCompletedBtn = document.getElementById('clear-completed');
  const clearAllBtn = document.getElementById('clear-all');
  const sortSelect = document.getElementById('sort');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo();
  });

  todoList.addEventListener('click', function(event) {
    if (event.target.tagName.toLowerCase() === 'li') {
      toggleCompleted(event.target);
    }
  });

  todoList.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    if (event.target.tagName.toLowerCase() === 'li') {
      editTodoText(event.target);
    }
  });

  clearCompletedBtn.addEventListener('click', function() {
    clearCompleted();
  });

  clearAllBtn.addEventListener('click', function() {
    clearAll();
  });

  sortSelect.addEventListener('change', function() {
    sortTodos();
  });

  function addTodo() {
    const todoText = input.value.trim();
    if (todoText === '') return;
    
    const todoItem = document.createElement('li');
    todoItem.textContent = todoText;
    todoList.appendChild(todoItem);

    saveTodosToLocalStorage();
    
    input.value = '';
  }

  function toggleCompleted(todoItem) {
    todoItem.classList.toggle('completed');
    saveTodosToLocalStorage();
  }

  function editTodoText(todoItem) {
    const newText = prompt('Edit todo:', todoItem.textContent);
    if (newText !== null) {
      todoItem.textContent = newText.trim();
      saveTodosToLocalStorage();
    }
  }

  function clearCompleted() {
    const completedTodos = document.querySelectorAll('.completed');
    completedTodos.forEach(todo => todo.remove());
    saveTodosToLocalStorage();
  }

  function clearAll() {
    todoList.innerHTML = '';
    saveTodosToLocalStorage();
  }

  function sortTodos() {
    const todos = Array.from(todoList.children);
    const sortValue = sortSelect.value;
    if (sortValue === 'asc') {
      todos.sort((a, b) => a.textContent.localeCompare(b.textContent));
    } else if (sortValue === 'desc') {
      todos.sort((a, b) => b.textContent.localeCompare(a.textContent));
    }
    todoList.innerHTML = '';
    todos.forEach(todo => todoList.appendChild(todo));
    saveTodosToLocalStorage();
  }

  function saveTodosToLocalStorage() {
    const todos = Array.from(todoList.children).map(todo => {
      return {
        text: todo.textContent,
        completed: todo.classList.contains('completed')
      };
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadTodosFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
      const todoItem = document.createElement('li');
      todoItem.textContent = todo.text;
      if (todo.completed) {
        todoItem.classList.add('completed');
      }
      todoList.appendChild(todoItem);
    });
  }

  loadTodosFromLocalStorage();
});
