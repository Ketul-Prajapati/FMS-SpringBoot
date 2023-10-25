// Import the 'createStore' function from the 'redux' library and alias it as 'createStore'
import { legacy_createStore as createStore } from "redux";

// Import the 'reducers' function from a separate file
import { reducers } from "./reducers";

// Create a Redux store by passing the 'reducers' function and optional enhancers
const mystore = createStore(
  reducers, // The 'reducers' function that defines how the state should be updated
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Optional: Redux DevTools extension for debugging
);

// Export the created Redux store so it can be used in other parts of the application
export default mystore;
