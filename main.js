function taskCheckHanlder() {
  var isChecked = this.checked;
  var $todo = $(this).parent();

  $todo.toggleClass('done', isChecked);
}

function clearDoneTasks() {
  $('.todo-list li.done').remove();
}

function createTodo(text) {
  var todoHtml = ''
    + '<li>'
    + '  <a href="###" class="action-remove">&times;</a>'
    + '  <input type="checkbox" />' + text
    + '</li>';
  $(todoHtml).appendTo('.todo-list');
}

function removeTodo() {
  $(this).parents('li').fadeOut(function() {
    $(this).remove();
  });
}

function keyPressHandler(event) {
  if (event.keyCode != 13) return;
  
  createTodo(this.value);
  this.value = '';
}

$(function() {
  $('#todo-input').on('keypress', keyPressHandler);
  $(document).on('change', '.todo-list li :checkbox', taskCheckHanlder);
  $(document).on('click', '.action-remove', removeTodo);
  $('#action-clean-done').on('click', clearDoneTasks);
});
