import {createStore, combineReducers} from 'redux'
import reducer from './reducer'
import {addContact} from './actions'

const store = createStore(reducer);

// Dispatch a few actions
store.dispatch(updateUser({ foo: "foo" }));
store.dispatch(updateUser({ bar: "bar" }));
store.dispatch(updateUser({ baz: "baz" }));

store.dispatch(addContact({ name: "caio", phone: "123456789" }));
store.dispatch(addContact({ name: "oiac", phone: "987654321" }));

console.log(store.getState());
