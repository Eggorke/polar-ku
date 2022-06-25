const userSignUp = (values: {}) => {
  return {
    type: 'USER_SIGNUP',
    payload: values
  }
}

const userSignIn = (values: {}) => {
  return {
    type: 'USER_SIGN_IN',
    payload: values
  }
}

const userSignOut = () => {
  return {
    type: 'USER_SIGN_OUT'
  }
}

const clearProfile = () => {
  return {
    type: 'CLEAR_PROFILE'
  }
}

const getSelfInfo = (values: {}) => {
  return {
    type: 'GET_SELF_INFO',
    payload: values
  }
}


export {
  userSignUp,
  getSelfInfo,
  userSignIn,
  userSignOut,
  clearProfile,
}
