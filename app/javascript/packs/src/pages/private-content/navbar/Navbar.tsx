import * as React from 'react'
import s from './styles.module.scss'
import { authInitialStateI, profileInitialStateI } from '../../../reducers/interfaces'
import { clearProfile, userSignOut } from '../../../actions'
import { connect } from 'react-redux'
import ApiService from '../../../lib/services/api-service'
import { NavLink } from 'react-router-dom'
import PrivateRoutes from '../../../navigation/PrivateRoutes'
import toast from 'react-hot-toast';
import { Config } from '../../../config'

interface navbarPropsI {
  state: {
    auth: authInitialStateI
    profile: profileInitialStateI
  }
  clearProfile: () => {type: string}
  userSignOut: () => {type: string}
}

const apiService = new ApiService()

const Navbar: React.FC = (props: navbarPropsI) => {

  const { state, clearProfile, userSignOut } = props
  const { email, firstName, lastName } = state.profile

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    apiService.signOut()
      .then(() => {
        clearProfile()
        userSignOut()
        toast.success('Ждем вас вновь!', { duration: Config.NOTIFICATION_DEFAULT_DURATION })
      })
  }

  return (
    <div className={s.navbarWrapper}>
      <NavLink to={PrivateRoutes.app.path}>Главная</NavLink>
      <NavLink to={`/app${PrivateRoutes.orders.path}`}>Заявки</NavLink>
      <span>{firstName}</span>
      <span>{lastName}</span>
      <span>{email}</span>
      <button onClick={handleLogout}>
        Logout
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
