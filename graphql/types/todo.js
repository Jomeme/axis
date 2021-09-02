class TodoQuery {
  constructor(id) {
    this.id = id;
  }

  allTodos() {
    return ['All'];
  }

  getTodo({ id }) {
    return 'The id: ' + id;
  }

  getTodoTitle({ id }) {
    return 'Title - ' + id;
  }
}

module.exports = TodoQuery;