import * as React from 'react'
import { clearProfile, userSignOut } from '../../actions'
import { connect } from 'react-redux'
import s from './styles.module.scss'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import Orders from './orders/Orders'
import PrivateRoutes from '../../navigation/PrivateRoutes'
import Sidebar from './sidebar/Sidebar'
import Reports from './reports/Reports'
import Settings from './settings/Settings'
import NewOrder from './orders/NewOrder'


const PrivateContent = () => {
  return (
    <div className={s.main}>
      <div className={s.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={s.contentContainer}>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path={PrivateRoutes.orders.path} element={<Orders />}/>
          <Route path={PrivateRoutes.newOrder.path} element={<NewOrder />}/>
          <Route path={PrivateRoutes.reports.path} element={<Reports />}/>
          <Route path={PrivateRoutes.settings.path} element={<Settings />}/>
        </Routes>
      </div>
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
