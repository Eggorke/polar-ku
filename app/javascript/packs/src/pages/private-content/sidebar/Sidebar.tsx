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
import classNames from 'classnames'
import { IoGrid, IoHammerSharp, IoPerson, IoOpen, IoExitOutline } from 'react-icons/io5';

interface navbarPropsI {
  state: {
    auth: authInitialStateI
    profile: profileInitialStateI
  }
  clearProfile: () => {type: string}
  userSignOut: () => {type: string}
}

const apiService = new ApiService()

const Sidebar: React.FC = (props: navbarPropsI) => {

  const { state, clearProfile, userSignOut } = props
  const { email, firstName, lastName } = state.profile

  const DashboardLink = {
    route: PrivateRoutes.app.path,
    title: 'Главная',
    icon: <IoGrid />
  }

  const LINKS = [
    {
      route: `/app${PrivateRoutes.orders.path}`,
      title: 'Заявки',
      icon: <IoHammerSharp />
    },
    {
      route: `/app${PrivateRoutes.reports.path}`,
      title: 'Отчеты',
      icon: <IoOpen />
    },
    {
      route: `/app${PrivateRoutes.settings.path}`,
      title: 'Настройки',
      icon: <IoPerson />
    }
  ]

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
    <div className={s.sidebarWrapper}>
      <div className={s.userInfoWrapper}>
        <div className={s.userAvatar}></div>
        <div className={s.userName}>
          {firstName + ' ' + lastName}
        </div>
        <div className={s.userEmail}>
          {email}
        </div>
      </div>
      <div className={s.navWrapper}>
        <NavLink
          to={DashboardLink.route}
          className={({ isActive }) =>
            isActive ? classNames(s.navLink, s.activeLink) : s.navLink
          }
          end
        >
          <div><span className={s.icon}>{DashboardLink.icon}</span><span className={s.title}>{DashboardLink.title}</span></div>
        </NavLink>
        {
          LINKS.map(el => {
            return (
              <NavLink
                to={el.route}
                className={({ isActive }) =>
                  isActive ? classNames(s.navLink, s.activeLink) : s.navLink
                }
                key={el.route}
              >
                <div><span className={s.icon}>{el.icon}</span><span className={s.title}>{el.title}</span></div>
              </NavLink>
            )
          })
        }
      </div>
      <button className={classNames(s.logout)} onClick={handleLogout}>
        <span className={s.icon}><IoExitOutline /></span><span className={s.title}>Выйти</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
