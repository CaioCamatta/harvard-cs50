import { combineReducers } from "redux";

import { UPDATE_USER, UPDATE_CONTACT } from "./actions";

const merge = (prev, next) => Object.assign({}, prev, next);

const contactReducer = (state = [], action) => {
  if (action.type == UPDATE_CONTACT) return [...state, action.payload];
  return state;
};
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload);
    case UPDATE_CONTACT:
      return merge(state, { recentlyContact: action.payload });
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  contacts: contactReducer,
});
