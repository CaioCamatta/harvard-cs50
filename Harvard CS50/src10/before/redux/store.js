import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {addContact} from './actions'
import reducer from './reducer'

/*// if the action creator returns a function, we add to redux a way to know and handle that
const thunk = ({getState, dispatch}) => next => action => {
    if (typeof action === 'function'){
        action(store.dispatch)
    } else {
        next(action)
    }
}*/



const store = createStore(reducer, applyMiddleware(thunk))

/*
store.dispatch(updateUser({foo: 'foo'}))
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))
*/

store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
store.dispatch(addContact({name: 'jordan h', phone: '1234567890'}))
store.dispatch(addContact({name: 'david m', phone: '5050505050'}))

console.log(store.getState())

export default store
