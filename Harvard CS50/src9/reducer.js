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
