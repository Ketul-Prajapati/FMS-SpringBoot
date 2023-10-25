// Importing action types (constants) from a separate file
import { USER_DATA, USER_LOGIN_ID } from "./action";

// Define the initial state for the Redux store
let initialState = {
  userData: {},      // Initialize an empty object for user data
  userLoginId: "",   // Initialize an empty string for user login ID
};

// Define the reducers function, which takes the current state and an action as parameters
export const reducers = (state = initialState, action) => {
  // Use a switch statement to handle different action types
  switch (action.type) {
    case USER_DATA:
      // If the action type is USER_DATA, update the state with new user data
      return { ...state, userData: action.payload };

    case USER_LOGIN_ID:
      // If the action type is USER_LOGIN_ID, update the state with a new user login ID
      return { ...state, userLoginId: action.payload };

    default:
      // If the action type is not recognized, return the current state (no changes)
      return state;
  }
};
