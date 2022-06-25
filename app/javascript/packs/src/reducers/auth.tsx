import { authInitialStateI, authActionI } from "./interfaces";

const initialState: authInitialStateI = {
  accessToken: null,
  accessClient: null,
  accessUID: null,
}

const reducer = (state: authInitialStateI = initialState, action: authActionI) => {
  switch (action.type) {
    case 'USER_SIGNUP':
      return {
        accessToken: action.payload.accessToken,
        accessClient: action.payload.accessClient,
        accessUID: action.payload.accessUID
      };
    case 'USER_SIGN_IN':
      return {
        accessToken: action.payload.accessToken,
        accessClient: action.payload.accessClient,
        accessUID: action.payload.accessUID
      }
    case 'USER_SIGN_OUT':
      return initialState
    default: return state;
  }
}

export {reducer}
