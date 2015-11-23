function toggleTodo(todoId, done) {
  chrome.storage.local.get(todoId, function(result) {
    result[todoId]['done'] = done;
    chrome.storage.local.set(result);
  });
}

function todoCheckHanlder() {
  var $todo = $(this).parent();
  $todo.toggleClass('checked', this.checked);
  toggleTodo($todo.attr('id'), this.checked);
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
  var checked = todo.done ? 'checked' : '';

  var $list = $('.todo-list');
  var $content = $('.content');
  var todoHtml = ''
    + '<li class="todo ' + checked + '" id="' + todo.id + '">'
    + '  <a href="###" class="action-remove">删除</a>'
    + '  <input type="checkbox" ' + checked + ' />' + todo.title
    + '</li>';

  $list.append(todoHtml);
  $content.stop().animate({
    scrollTop: $list.prop('scrollHeight')
  }, 300);
}

function saveTodo(title, callback) {
  var todo = { title: title, done: false };
  todo.id = 'todo-' + new Date().getTime();

  var record = {};
  record[todo.id] = todo;

  chrome.storage.local.set(record);
}

function removeTodoHandler() {
  removeTodo($(this).parents('.todo'));
}

function removeTodo($todo) {
  $todo.fadeOut($todo.remove);
  chrome.storage.local.remove($todo.attr('id'), function() {
    $todo.remove();
  });
}

function saveTodo(todo) {
  var object = {};
  object[todo.id] = todo;

  chrome.storage.local.set(object);
}

function addTodoHandler(event) {
  if (event.keyCode != 13) return;

  var todo = {
    id: 'todo-' + new Date().getTime(),
    title: this.value,
    done: false
  };

  saveTodo(todo);
  addTodoElement(todo);
  
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
