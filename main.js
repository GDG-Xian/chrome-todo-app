function createTodo(text) {
  var todo = document.createElement('li');
  todo.innerHTML = '<input type="checkbox" /> ' + text;
  todo.className = 'list-group-item';
  
  document.querySelector('.todo-list').appendChild(todo);
}

function keyPressHandler(event) {
  if (event.keyCode != 13) return;
  
  createTodo(this.value);
  this.value = '';
}

function initialize() {
  var todoInput = document.querySelector('#todo-input');
  todoInput.addEventListener('keypress', keyPressHandler, false);
}

window.onload = initialize;