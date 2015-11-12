function taskCheckHanlder() {
  var isChecked = this.checked;
  var $todo = $(this).parent();

  $todo.toggleClass('done', isChecked);
}

function createTodo(text) {
  var todoHtml = '<li><input type="checkbox" />' + text + '</li>';
  $(todoHtml).appendTo('.todo-list');
}

function keyPressHandler(event) {
  if (event.keyCode != 13) return;
  
  createTodo(this.value);
  this.value = '';
}

$(function() {
  $('#todo-input').on('keypress', keyPressHandler);
  $(document).on('change', '.todo-list li :checkbox', taskCheckHanlder);
});
