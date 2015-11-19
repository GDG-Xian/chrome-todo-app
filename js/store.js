(function() {
  var TodoStore = {
    add: function(todo, callback) {
      db.put(todo, callback);
    },

    all: function(callback) {
      db.allDocs({
        include_docs: false
      }).then(function (result) {
        callback(result.rows);
      });
    }
  };

  window.TodoStore = TodoStore;
})();
