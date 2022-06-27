export interface authInitialStateI {
  accessToken: string | null
  accessClient: string | null
  accessUID: string | null
}

export interface profileInitialStateI {
  id: string | null
  email: string | null
  firstName: string | null
  lastName: string | null
  organizationId: string | null
  isAuthenticated: boolean
}

export interface authActionI {
  type: string
  payload: authInitialStateI
}

export interface profileActionI {
  type: string
  payload: profileInitialStateI
}
