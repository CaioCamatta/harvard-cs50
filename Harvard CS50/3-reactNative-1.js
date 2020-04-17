/* --------------- Third lecture, including notes --------------- */
// REACT NATIVE
//  JS is bundled and minified. Multiple files > one/few files
//  different threads communicate asinc through a bridge
//  one thread for UI, one thread for JS, one thread for layout
//  JS can be blocked and UI will still work
//  RN vs Web: Base components, Style, no browser API's
//      divs -> View, span -> Text, button -> Button

//Transforming todo app into react native app
import React from "react";
import {View, Button, Text, ScrollView} from 'react-native'

let id = 0;

const Todo = props => (
  <View>
    <Button onPress={props.onDelete} title='delete'/>
    <Text>{props.todo.text}</Text>
  </View>
);

export default class App extends React.Component {
  constructor() {
    super(); // invokes constructor on react.component
    this.state = {
      todos: []
    };
  }

  addTodo() {
    id++
    const text = 'TODO number ${id}'
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
      <View>
        <Text>
          Todo count {this.state.todos.length}. Done:{" "}
          {this.state.todos.filter(todo => todo.checked).length}
        </Text>
        <Button onPress={() => this.addTodo()} title='Add TODO'/>
        <ScrollView>
          {this.state.todos.map(todo => (
            <Todo
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
              onToggle={() => this.toggleTodo(todo.id)}
            />
          ))}
        </ScrollView>
      </View>
    );
  } 
}


//Style