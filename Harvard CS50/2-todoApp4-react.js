import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

let id = 0;

const Todo = props => (
  <li>
    <input
      type="checkbox"
      checked={props.todo.checked}
      onChange={props.onToggle}
    />
    <button onClick={props.onDelete}>Delete</button>
    <span>{props.todo.text}</span>
  </li>
);

class App extends React.Component {
  constructor() {
    super(); // invokes constructor on react.component
    this.state = {
      todos: []
    };
  }

  addTodo() {
    const text = prompt("Todo text:");
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }]
    }); //... pulls out all the values of an array and puts it into a new one (force pass by value instead of standard reference)
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.text,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  }

  render() {
    return (
      <div>
        <div>
          Todo count {this.state.todos.length}. Done:{" "}
          {this.state.todos.filter(todo => todo.checked).length}
        </div>
        <button onClick={() => this.addTodo()}>Add TODO</button>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
              onToggle={() => this.toggleTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    );
  } // lexically bind this.addTodo do this object
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
