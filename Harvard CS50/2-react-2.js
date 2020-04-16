/* --------------- Third lecture, including notes --------------- */
// WRITING REACT
//  JSX: lowercase = HTML/SVG, UPPERCASE = custom components 
//  components are just functions that return a node that react can render and receive an object of the properties passed to the element

// PROPS: passed as an object to a component and used to compute the returned node. Any changes to these props causes a rerender

// Practice in condesandbox.io
class App extends React.Component {
    constructor(props) {
      super(props);
      // State is object bound, whereas props are passed as input
      this.state = {
        count: 0
      };
    }
    // Arrow automatically binds
    increaseCount() {
      // setState is async. Operations are batched and then merged. i.e
      /*this.setState({ count: this.state.count + 1 });
      this.setState({ count: this.state.count + 1 }); // will only add 1*/
      this.setState(prevState => ({ count: prevState.count + 1 }));
      this.setState(prevState => ({ count: prevState.count + 1 })); // will add 2
    }
  
    // Must bind increase count to this object.
    // () => Creates new anonym function that invokes increases count and automatically binds this to be what we want it to be
    render() {
      return (
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Count: {this.state.count}</h2>
          <div>
            <button onClick={() => this.increaseCount()}>Increase</button>
          </div>
        </div>
      );
    }
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App count={0} />, rootElement);
  

// STATE
//  internally manage configuration for a component
//  'this.state' is a class property on the component instance
//  can only be updated by invoking 'this.setState()', which is a async