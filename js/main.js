function todoCheckHanlder() {
  var $todo = $(this).parent();
  $todo.toggleClass('done', this.checked);
}

  // chrome.storage.local.get($todo.attr('id'), function(result) {
  //   var todo = result[$todo.attr('id')];
  //   todo.done = isChecked;

  // });

function clearDoneTodos() {
  $('.todo.done').each(function() {
    removeTodo($(this));
  });
}

function addTodoElement(todo) {
  var todoHtml = ''
    + '<li class="todo">'
    + '  <a href="###" class="action-remove">删除</a>'
    + '  <input type="checkbox" />' + todo.title
    + '</li>';
  $(todoHtml).appendTo('.todo-list');
}

function saveTodo(title, callback) {
  var todo = { title: title, done: false };
  todo.id = 'todo-' + new Date().getTime();

  var record = {};
  record[todo.id] = todo;

  chrome.storage.local.set(record, function() {
    
  });
}

function removeTodoHandler() {
  removeTodo($(this).parents('.todo'));
}

function removeTodo($todo) {
  $todo.remove();
}
  // chrome.storage.local.remove($todo.attr('id'), function() {
  //   $todo.remove();
  // }); 

function addTodoHandler(event) {
  if (event.keyCode != 13) return;

  addTodoElement({ title: this.value, done: false });
  this.value = '';
}

function loadTodos() {
  chrome.storage.local.get(null, function(todos) {
    for (var id in todos) {
      addTodoElement(todos[id]);
    }
  });
}

$(function() {
  $('#todo-input').on('keypress', addTodoHandler);
  $(document).on('change', '.todo :checkbox', todoCheckHanlder);
  $(document).on('click', '.action-remove', removeTodoHandler);
  $('.action-clear').on('click', clearDoneTodos);

  loadTodos();
});
