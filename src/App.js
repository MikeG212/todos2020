import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      string: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let string = this.state.string.slice();
    const newTodo = {
      id: 1 + Math.random(),
      string,
      complete: false
    }
    let todos = [...this.state.todos, newTodo];
    this.setState({ todos, string: ""})
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ string: event.target.value})
  }

  delete = (id) => {
    let todos = [...this.state.todos];
    let updatedTodos = todos.filter(todo => todo.id !== id);
    this.setState({todos: updatedTodos});
  }

  toggleComplete = (id) => {
    let todos = [...this.state.todos];
    let updatedTodos = todos.map(todo => {
      if(todo.id === id) {
        return {
          id: todo.id,
          string: todo.string,
          complete: !todo.complete
        };
      }
      return todo;
    })
    this.setState({todos: updatedTodos});
  }

  renderActiveCount = () => {
    return this.state.todos.filter(todo => !todo.complete).length
  }


  render() {
    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input onChange={(event) => this.handleChange(event)} value={this.state.string}></input>
        </form>
        <ul>
          {this.state.todos.map(todo => {
          return (
            <li key={todo.index}>{todo.string}
              <input type="checkbox" onClick={()=>this.toggleComplete(todo.id)}/>
              <button onClick={()=>this.delete(todo.id)}>Delete</button>
            </li>
          )
          })}
          Active Tasks: {this.renderActiveCount()}
        </ul>
      </div>
    )
  }

}

export default App;
