/* --------------- ASYNC REDUX --------------- */
// REACT-REDUX
<Provider /> // gives children access to the redux store
connect() // helps us subscribe any subset of our store and bind our action creators

// Support Async Request
// async action creator
const logInUser = (username, password) => (dispatch) => {
    dispatch({ type: LOG_IN_SENT });
    login(username, password)
      .then(() => {
        dispatch({ type: "LOG_IN_FULFILLED" });
      })
      .catch((err) => {
        dispatch({ type: "LOG_IN_REJECTED" });
      });
  };
  
// REDUX MIDDLEWARE
// allows us to extend redux without having to touch the implementation
// any functions with this prototype can be middleware
//  ({getState, dispatch}) => next => action => void
// The middleware is in between action and reducer

// if the action creator returns a function, we add to redux a way to know and handle that. In this case we are handling async actions
const thunk = ({getState, dispatch}) => next => action => {
    if (typeof action === 'function'){
        action(store.dispatch)
    } else {
        next(action)
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

// the libary 'react-thunk' is an action creator that returns a function to perform asynchronous dispatch.

// PERSISTING STATE
//  with redux, our app is just a function of our store.
//  by persisting the store, we can reload the app into the current state.
//  'redux-persist' is a nice abstraction on top of AsyncStore

// CONTAINER VS PRESENTATIONAL COMPONENTS
// a simple component should not be listening to the whole application's state. Instead it should wait for it's parent to pass updates down. These are presentational components.
// container components (like screens) should listen to the app's state.

// DO I NEED REDUX ?
// helps apps scale, but adds complexity and overhead.
// if you end up running into scalability issues, then you move to redux (could be just a forethought)
//      deeply nested states
//      duplicated informations in state
//      not updating all dependent props
//      components with large number of props