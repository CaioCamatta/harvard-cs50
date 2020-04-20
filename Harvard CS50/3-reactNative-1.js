/* --------------- Fourth lecture, including notes --------------- */
// REACT NATIVE
//  JS is bundled and minified. Multiple files > one/few files
//  different threads communicate asinc through a bridge
//  one thread for UI, one thread for JS, one thread for layout
//  JS can be blocked and UI will still work
//  RN vs Web: Base components, Style, no browser API's
//      divs -> View, span -> Text, button -> Button

//Transforming todo app into react native app
import React from "react";
import {View, Button, Text, ScrollView, StyleSheet, Switch} from 'react-native'

let id = 0;

const styles = StyleSheet.create({
  TodoContainer: {
    flexDIrection: 'row', 
    alignItems:'center'
  },
  appContainer: {
    flex: 1,
    paddingTop: 20
  },
  fill:{
    flex: 1
  }
})

const Todo = props => (
  <View style={styles.TodoContainer}>
  <Switch value={props.todo.checked} onValueChange={props.onToggle}/>
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
      <View style={[styles.appContainer, styles.fill]}>
        <Text>
          Todo count {this.state.todos.length}. Done:{" "}
          {this.state.todos.filter(todo => todo.checked).length}
        </Text>
        <Button onPress={() => this.addTodo()} title='Add TODO'/>
        <ScrollView style={styles.fill}>
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
// React Native uses JS objects for styling, based on CSS properties. R-N uses flexbox
// Lengths are in unitless numbers
// Stylesheets only sends IDs over the bridge
// Unlike web, in native only a few components are touchable, e.g Button

// COMPONENTS
//  "All React components must act like pure functions with respect to their props"]

// STATELESS FUNCTIONAL COMPONENTS
//  takes props and returns a node (does not set values, push to arrays, etc)
//  any changes in props will cause the function to be re-invoked

// REACT.COMPENENT
//  an abstract class that can be extended
//  these have additional features that SFCs dont. I.e. have instances, maintain their own states and have lifecycle methods that are automatically invoked
//  MOUNT: construtor(props) gets called -> render(), the mean of a component -> componentDidMount() can do anything that isn't needed for UI

// UPDATE
//  componentWillReceiveProps(nextProps)
//  shouldComponentUpdate
//  render()
//  componentdidUpdate

// UNMOUNT
//  clean up remove event listeners, invalidate network requests, clear timeouts/intervals
import React from "react";
import {View, Button, Text, ScrollView, StyleSheet, Switch} from 'react-native'

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 40,
  }
}) 

// class CountEvenNumbers extends React.Component{
//   render(){
//     return(
//       <Text style={styles.count}>{this.props.count}</Text>
//     )
//   }
//   shouldComponentUpdate(nextProps){
//     return !(nextProps.count % 2)
//   }
//   componentDidUpdate(){
//     console.log(this.props.count)
//   }
// }

class Counter extends React.Component {
  constructor() {
    super(); // invokes constructor on react.component
    this.state = {
      count: 0
    }
  }

  // Gets called after component finishes mounting
  componentDidMount(){
    console.log('increment')
    this.interval = setInterval(this.inc, 1000)
  }

  // When the component is to be unmounted, this will be called automatically
  componentWillUnmount(){
    clearInterval(this.interval)
  }

  // automatically bind function to component. Alternatively, we could write the function in the constructor.
  // must bind every function you invent (i.e. not built-in ones)
  inc = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Text style={styles.count}>{this.state.count}</Text>
      </View>
    );
  } 
}

export default class App extends React.Component{
  constructor(props){
    super()
    this.state = {
      showCounter: true,
    }
  }

  // Remember to bind
  toggleCounter = () => this.setState(prevState => ({
    showCounter: !prevState.showCounter,
  }))

  render(){
    if(this.state.showCounter){
      return(
        <View style={styles.appContainer}>
          <Button title="toggle" onPress={this.toggleCounter} />
          <Counter />
        </View>
      )
    } else {
      return (<Button title="toggle" onPress={this.toggleCounter} />)
    } 
  }
}

// EXPO
//  suite of tools to accelerate react development process
//  Snack, SDE, CLI, client, SDK

// IMPORTING/EXPORTING
//  export default class -> "from this files, export this class"
//  export named must be {imported with the exact name}
//  export default can be imported with any name, but only 1 can be exported

// PROPTYPES
//  development tool that helps keep track of props
//  helps document apis

// Code is in react/app from now on