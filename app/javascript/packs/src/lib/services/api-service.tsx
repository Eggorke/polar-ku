import api from "../api"
import BACKEND_ROUTES from "./backend-routes"

export default class ApiService {
  // Auth
  getCurrentUser() {
    return api.get(BACKEND_ROUTES.selfInfo)
  }

  signUp(payload: {}) {
    return api.post(BACKEND_ROUTES.signUp, {body: payload})
  }

  signIn(payload: {}) {
    return api.post(BACKEND_ROUTES.signIn, {body: payload})
  }

  signOut() {
    return api.delete(BACKEND_ROUTES.signOut)
  }

  // Organizations
  getAllOrganizations(query: {}) {
    return api.get(BACKEND_ROUTES.organizations, {query: query})
  }

  // Orders
  createNewOrder(payload: {}) {
    return api.post(BACKEND_ROUTES.orders, {body: payload})
  }

  getAllOrders() {
    return api.get(BACKEND_ROUTES.orders)
  }
}
