import api from "../api"

export default class ApiService {
  // Users
  getCurrentUser() {
    return api.get('/api/v1/self_info')
  }

  signUp(payload: {}) {
    return api.post('/auth', {body: payload})
  }

  signIn(payload: {}) {
    return api.post('/auth/sign_in', {body: payload})
  }

  signOut() {
    return api.delete('/auth/sign_out')
  }
}
