/* --------------- REDUX --------------- */
// FLUX is an unidirectional architecture that inspired redux.
// REDUX
// a data management library
// one big object keeps track of all the states
// state can only be updated by an action that triggers a recomputation
// updates are made using pure functions
// Action → Reducer (dispatcher) → Update Store

// REDUCER
// takes a state and applies an update
// deterministic function: the same input will always produce the same output
// immutable: returns new object every time (different reference)

// Simple reducer
const merge = (prev, next) => Object.assign({}, prev, next)   
const reducer = (state, update) => merge(state,update)

let state = {}
state = reducer(state, {foo: 'foo'})
state = reducer(state, {bar: 'bar'})
state = reducer(state, {baz: 'baz'})

console.log(state)

// STORE
// maintains the state
// exposes getter via getState()
// can only be updated using dispatch()
// can add listeners that get invoked with the state changes

// Simple store
class Store {
    constructor(reducer, initialState) {
      this.reducer = reducer;
      this.state = initialState;
    }
  
    getState() {
      return this.state;
    }
  
    dispatch(update){
        this.state = this.reducer(this.state, update)
    }
  }
  
  const merge = (prev, next) => Object.assign({}, prev, next);
  
  const reducer = (state, update) => merge(state, update);
  
  const store = new Store(reducer)
  
  store.dispatch({ foo: "foo" });
  store.dispatch({ bar: "bar" });
  store.dispatch({ baz: "baz" });
  
  console.log(store.getState());

// ACTION
//  an action is a piece of data that contains the information required to make a state update
// actions generally have a 'type' key
// actions have a common shape and goals (from Flux)
// goals: human-friendly, useful, simple
example = {
    type: 'ADD_TODO',
    payload: {
        text: 'Do something.'
    }
}
// an action MUST be a plain JS object and have a type.
// it may have: error, payload, meta
// no other properties are allowed 

// SIMPLE REDUX IMPLEMENTATION
// Action types
// Storing actions as constants prevents typos
const UPDATE_USER = "UPDATE_USER";
const UPDATE_CONTACT = "UPDATE_CONTACT";

class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  dispatch(update) {
    this.state = this.reducer(this.state, update);
  }
}

const DEFAULT_STATE = { user: {}, contacts: [] };

const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state, newContact) => [...state, newContact];
const userReducer = (state, update) => merge(state, update);

const reducer = (state, action) => {
  if (action.type === UPDATE_USER) {
    return merge(
      state,
      { user: userReducer(state.user, action.payload) } // don't pass whole state..
    );
  }

  if (action.type === UPDATE_CONTACT) {
    return merge(
      state,
      { contacts: contactReducer(state.contacts, action.payload) } // don't pass whole state..
    );
  }

  return state;
};

const store = new Store(reducer, DEFAULT_STATE);

// Action creators
const updateUser = (update) => ({
  type: UPDATE_USER,
  payload: update,
});

const addContact = (newContact) => ({
  type: UPDATE_CONTACT,
  payload: newContact,
});

// Dispatch a few actions
store.dispatch(updateUser({ foo: "foo" }));
store.dispatch(updateUser({ bar: "bar" }));
store.dispatch(updateUser({ baz: "baz" }));

store.dispatch(addContact({ name: "caio", number: "123456789" }));
store.dispatch(addContact({ name: "oiac", number: "987654321" }));

console.log(store.getState());

// IMPROVED REDUCER
const contactReducer = (state, action) => {
  if (action.type == UPDATE_CONTACT) return [...state, action.payload]
  return state;
};
const userReducer = (state, action) => {
  if (action.type == UPDATE_USER) return merge(state, action.payload)
  if (action.type == UPDATE_CONTACT) return merge(state, {recentlyContact: action.payload})
  return state;
};

const reducer = (state, action) => ({
  user: userReducer(state.user, action),
  contacts: contactReducer(state.contacts, action),
});

// HOC
// use to subscribe to changes to Store and automatically update state and bind dispatchs
// package 'react-redux'