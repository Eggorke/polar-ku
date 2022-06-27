import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './pages/auth/Registration'
import Login from './pages/auth/Login'
import Homepage from './pages/homepage/Homepage'
import PublicRoutes from './navigation/PublicRoutes'
import './app.scss'
import PrivateRoutes from './navigation/PrivateRoutes'
import PrivateContent from './pages/private-content/PrivateContent'
import { connect } from 'react-redux'
import ApiService from './lib/services/api-service'
import { getSelfInfo, clearProfile, userSignOut } from './actions'
import { authInitialStateI, profileInitialStateI } from './reducers/interfaces'
import PrivateWrapper from './navigation/PrivateWrapper'

interface appPropsI {
  state: {
    auth: authInitialStateI
    profile: profileInitialStateI
  }
  getSelfInfo: ({}) => {type: string, payload: {}}
  clearProfile: () => {type: string}
  userSignOut: () => {type: string}
}

interface responseI {
  status: number
  data: {
    data: dataI
  }
}

interface dataI {
  attributes: {
    first_name: string
    last_name: string
    email: string
    organization_id: string
  }
  id: string
}

const apiService = new ApiService()

const App: React.FC = (props: appPropsI) => {
  const { accessToken, accessClient, accessUID } = props.state.auth
  const { getSelfInfo, clearProfile, userSignOut } = props

  const condition = accessToken && accessClient && accessUID

  const logout = () => {
    userSignOut(),
    clearProfile()
  }

  React.useEffect(() => {
    if (condition) {
      apiService.getCurrentUser()
        .then((response: responseI) => {
          if (response.status !== 200) {
            return logout()
          }
          return response.data.data
        })
        .then((data: dataI) => {
          getSelfInfo(
            {
              id: data.id,
              firstName: data.attributes.first_name,
              lastName: data.attributes.last_name,
              email: data.attributes.email,
              organizationId: data.attributes.organization_id,
              isAuthenticated: true
            }
          )
        })
        .catch(() => {
          logout()
        })
    }
  }, [condition])

  return (
    <div className='app'>
      <Routes>
        <Route path={PublicRoutes.home.path} element={<Homepage />}/>
        <Route path={PublicRoutes.login.path} element={<Login />}/>
        <Route path={PublicRoutes.registration.path} element={<Registration />}/>
        <Route path={PrivateRoutes.root.path} element={<PrivateWrapper><PrivateContent /></PrivateWrapper>}/>
      </Routes>
    </div>
  )
}

const mapStateToProps = (state: {}) => {
  return { state }
}

const mapDispatchToProps = {
  getSelfInfo,
  clearProfile,
  userSignOut
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
