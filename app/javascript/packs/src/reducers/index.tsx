import { combineReducers } from "redux";
import { reducer as authReducer } from './auth'
import { reducer as profileReducer } from './profile'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer
