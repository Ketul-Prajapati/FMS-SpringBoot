// Import action type constants from a separate file
import { USER_DATA, USER_LOGIN_ID } from "./action";

// Define an action creator to set user data
export const setUserData = (data) => ({
  type: USER_DATA,  // Action type: USER_DATA
  payload: data,    // Payload data: Data provided as a parameter to the action creator
});

// Define an action creator to set user login ID
export const setUserID = (data) => ({
  type: USER_LOGIN_ID,  // Action type: USER_LOGIN_ID
  payload: data,       // Payload data: Data provided as a parameter to the action creator
});
