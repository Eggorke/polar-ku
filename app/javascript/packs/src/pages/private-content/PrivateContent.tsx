import * as React from 'react'
import { clearProfile, userSignOut } from '../../actions'
import { connect } from 'react-redux'
import { authInitialStateI, profileInitialStateI } from '../../reducers/interfaces'
import ApiService from '../../lib/services/api-service'

interface privateContentPropsI {
  state: {
    auth: authInitialStateI
    profile: profileInitialStateI
  }
  clearProfile: () => {type: string}
  userSignOut: () => {type: string}
}

const apiService = new ApiService()

const PrivateContent: React.FC = (props: privateContentPropsI) => {
  const { state, clearProfile, userSignOut } = props
  const { email } = state.profile

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    apiService.signOut()
      .then(() => {
        clearProfile()
        userSignOut()
      })
  }

  return (
    <div>
      {email}
      <button onClick={handleLogout}>
        Logout button
      </button>
    </div>
  )
}

const mapStateToProps = (state: {}) => {
  return { state }
}

const mapDispatchToProps = {
  clearProfile,
  userSignOut
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateContent)
