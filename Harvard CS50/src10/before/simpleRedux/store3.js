// ADDING ASYNC FUNCTIONS
const processContact = (contact) => ({
  name: `${contact.name.first} ${contact.name.last}`,
  phone: contact.phone,
});

export const fetchUsers = async () => {
  const response = await fetch("https://randomuser.me/api/?results=50&nat=us");
  const { results } = await response.json();
  return results.map(processContact);
};

export const login = async (username, password) => {
  const response = await fetch("http://localhost:8000", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    return true;
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

// action types
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

  dispatch(action) {
    if (typeof action === "function") {
      action(this.dispatch.bind(this));
    } else {
      this.state = this.reducer(this.state, action);
    }
  }
}

const DEFAULT_STATE = { user: {}, contacts: [] };

const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state, action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload];
  return state;
};

const userReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, actio.payload);
    case UPDATE_CONTACT:
      return merge(state, { prevContact: action.payload });
    case 'LOG-IN_SUCCESS':
      return merge(state, {token: 'fakeToken'});
    default:
      return state
  }
};

const reducer = (state, action) => ({
  user: userReducer(state.user, action),
  contacts: contactReducer(state.contacts, action),
});

// action creators
const updateUser = (update) => ({
  type: UPDATE_USER,
  payload: update,
});

const addContact = (newContact) => ({
  type: UPDATE_CONTACT,
  payload: newContact,
});

// async action creator
const logInUser = () => (dispatch) => {
  dispatch({ type: "LOG_IN_SENT" });
  fetch()
    .then(() => {
      dispatch({ type: "LOG_IN_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "LOG_IN_SUCCESS" });
    });
};

const store = new Store(reducer, DEFAULT_STATE);
store.dispatch(logInUser("username", "password"));
store.dispatch(updateUser({ foo: "foo" }));
store.dispatch(updateUser({ bar: "bar" }));
store.dispatch(updateUser({ foo: "baz" }));

store.dispatch(addContact({ name: "jordan h", number: "1234567890" }));
store.dispatch(addContact({ name: "jordan h", number: "1234567890" }));
store.dispatch(addContact({ name: "david m", number: "5050505050" }));

console.log(store.getState());
