import { profileInitialStateI, profileActionI } from "./interfaces";

const initialState: profileInitialStateI = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  isAuthenticated: false
}

const reducer = (state: profileInitialStateI = initialState, action: profileActionI) => {
  switch (action.type) {
    case 'GET_SELF_INFO':
      return {
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        isAuthenticated: action.payload.isAuthenticated
      };
    case 'CLEAR_PROFILE': {
      return initialState
    }
    default: return state;
  }
}

export {reducer}
